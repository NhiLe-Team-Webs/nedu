# Refactoring: Common Anti-Patterns

## Overview

This guide identifies common anti-patterns in web applications and shows how to refactor them to Clean Architecture.

## Anti-Pattern 1: Fat Controller

### Problem

Controllers contain business logic, making them hard to test and maintain.

### Before (❌ Anti-Pattern)

```php
class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => 'Invalid email'], 400);
        }
        
        // Business logic
        $total = $request->quantity * $request->price;
        
        if ($request->quantity >= 10) {
            $total *= 0.9; // 10% discount
        }
        
        if ($request->quantity >= 20) {
            $total *= 0.85; // 15% discount
        }
        
        // Database access
        $order = DB::table('orders')->insertGetId([
            'email' => $request->email,
            'total' => $total,
            'status' => 'pending',
            'created_at' => now()
        ]);
        
        // External service
        Mail::to($request->email)->send(new OrderConfirmation($order));
        
        return response()->json(['order_id' => $order], 201);
    }
}
```

**Problems**:
- Business logic in controller
- Hard to test without HTTP
- Violates Single Responsibility Principle
- Cannot reuse logic elsewhere

### After (✅ Clean Architecture)

```php
// Controller (Infrastructure)
class OrderController extends Controller
{
    public function __construct(
        private PlaceOrderHandler $handler
    ) {}
    
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|integer|min:0'
        ]);
        
        $command = new PlaceOrderCommand(
            email: $validated['email'],
            quantity: $validated['quantity'],
            price: $validated['price']
        );
        
        try {
            $orderId = $this->handler->handle($command);
            return response()->json(['order_id' => $orderId], 201);
        } catch (\DomainException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}

// Handler (Application)
class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepo,
        private EmailService $emailService
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        $order = Order::create(
            OrderId::generate(),
            new Email($command->email),
            new Money($command->price),
            $command->quantity
        );
        
        $this->orderRepo->save($order);
        $this->emailService->sendOrderConfirmation($order->getEmail(), $order->getId());
        
        return $order->getId()->getValue();
    }
}

// Entity (Domain)
class Order
{
    public static function create(
        OrderId $id,
        Email $email,
        Money $unitPrice,
        int $quantity
    ): self {
        $total = $unitPrice->multiply($quantity);
        $total = self::applyBulkDiscount($total, $quantity);
        
        return new self($id, $email, $total);
    }
    
    private static function applyBulkDiscount(Money $total, int $quantity): Money
    {
        if ($quantity >= 20) {
            return $total->multiply(0.85);
        }
        
        if ($quantity >= 10) {
            return $total->multiply(0.9);
        }
        
        return $total;
    }
}
```

**Benefits**:
- ✅ Thin controller (only HTTP concerns)
- ✅ Business logic in domain
- ✅ Easy to test
- ✅ Reusable logic

---

## Anti-Pattern 2: Anemic Domain Model

### Problem

Entities are just data containers with no behavior. All logic is in services.

### Before (❌ Anti-Pattern)

```php
// Anemic entity
class Order
{
    public int $id;
    public string $email;
    public int $total;
    public string $status;
}

// Service with all the logic
class OrderService
{
    public function placeOrder(array $data): int
    {
        $order = new Order();
        $order->email = $data['email'];
        $order->total = $data['quantity'] * $data['price'];
        $order->status = 'pending';
        
        if ($data['quantity'] >= 10) {
            $order->total *= 0.9;
        }
        
        DB::table('orders')->insert([
            'email' => $order->email,
            'total' => $order->total,
            'status' => $order->status
        ]);
        
        return $order->id;
    }
    
    public function confirmOrder(int $orderId): void
    {
        $order = DB::table('orders')->find($orderId);
        
        if ($order->status !== 'pending') {
            throw new Exception('Cannot confirm non-pending order');
        }
        
        DB::table('orders')->where('id', $orderId)->update(['status' => 'confirmed']);
    }
}
```

**Problems**:
- Entity has no behavior
- Business rules scattered in services
- Hard to maintain consistency
- Violates encapsulation

### After (✅ Rich Domain Model)

```php
// Rich domain entity
class Order
{
    private OrderId $id;
    private Email $email;
    private Money $total;
    private OrderStatus $status;
    
    private function __construct(
        OrderId $id,
        Email $email,
        Money $total
    ) {
        $this->id = $id;
        $this->email = $email;
        $this->total = $total;
        $this->status = OrderStatus::PENDING;
    }
    
    public static function create(
        OrderId $id,
        Email $email,
        Money $unitPrice,
        int $quantity
    ): self {
        $total = $unitPrice->multiply($quantity);
        
        if ($quantity >= 10) {
            $total = $total->multiply(0.9);
        }
        
        return new self($id, $email, $total);
    }
    
    public function confirm(): void
    {
        if ($this->status !== OrderStatus::PENDING) {
            throw new \DomainException('Cannot confirm non-pending order');
        }
        
        $this->status = OrderStatus::CONFIRMED;
    }
    
    public function cancel(): void
    {
        if ($this->status === OrderStatus::COMPLETED) {
            throw new \DomainException('Cannot cancel completed order');
        }
        
        $this->status = OrderStatus::CANCELLED;
    }
    
    // Getters...
}

// Application handler
class PlaceOrderHandler
{
    public function handle(PlaceOrderCommand $command): int
    {
        $order = Order::create(
            OrderId::generate(),
            new Email($command->email),
            new Money($command->price),
            $command->quantity
        );
        
        $this->orderRepo->save($order);
        
        return $order->getId()->getValue();
    }
}
```

**Benefits**:
- ✅ Business logic in entity
- ✅ Self-validating
- ✅ Encapsulated state
- ✅ Impossible to create invalid objects

---

## Anti-Pattern 3: Service Locator

### Problem

Using global service container to fetch dependencies instead of injection.

### Before (❌ Anti-Pattern)

```php
class PlaceOrderHandler
{
    public function handle(PlaceOrderCommand $command): int
    {
        // Service locator anti-pattern
        $orderRepo = app(OrderRepository::class);
        $emailService = app(EmailService::class);
        $eventBus = app(EventBus::class);
        
        $order = Order::create(...);
        $orderRepo->save($order);
        $emailService->sendConfirmation(...);
        $eventBus->publish(...);
        
        return $order->getId()->getValue();
    }
}
```

**Problems**:
- Hidden dependencies
- Hard to test
- Tight coupling to framework
- Violates Dependency Inversion

### After (✅ Dependency Injection)

```php
class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepo,
        private EmailService $emailService,
        private EventBus $eventBus
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        $order = Order::create(...);
        $this->orderRepo->save($order);
        $this->emailService->sendConfirmation(...);
        $this->eventBus->publish(...);
        
        return $order->getId()->getValue();
    }
}
```

**Benefits**:
- ✅ Explicit dependencies
- ✅ Easy to test (inject fakes)
- ✅ Framework-independent
- ✅ Clear contracts

---

## Anti-Pattern 4: God Object

### Problem

One class does everything.

### Before (❌ Anti-Pattern)

```php
class OrderManager
{
    public function createOrder($data) { }
    public function updateOrder($id, $data) { }
    public function deleteOrder($id) { }
    public function confirmOrder($id) { }
    public function cancelOrder($id) { }
    public function calculateTotal($orderId) { }
    public function applyDiscount($orderId, $percentage) { }
    public function sendConfirmation($orderId) { }
    public function generateInvoice($orderId) { }
    public function processPayment($orderId) { }
    public function refundPayment($orderId) { }
    // ... 50 more methods
}
```

**Problems**:
- Too many responsibilities
- Hard to maintain
- Hard to test
- Violates Single Responsibility

### After (✅ Separated Concerns)

```php
// Domain Entity
class Order {
    public function confirm(): void { }
    public function cancel(): void { }
    public function calculateTotal(): Money { }
    public function applyDiscount(int $percentage): void { }
}

// Application Handlers
class PlaceOrderHandler {
    public function handle(PlaceOrderCommand $command): int { }
}

class ConfirmOrderHandler {
    public function handle(ConfirmOrderCommand $command): void { }
}

class CancelOrderHandler {
    public function handle(CancelOrderCommand $command): void { }
}

// Domain Services
class OrderPricingService {
    public function calculateShipping(Order $order): Money { }
}

// Infrastructure Services
class OrderEmailService {
    public function sendConfirmation(Email $email, OrderId $id): void { }
}

class InvoiceGenerator {
    public function generate(Order $order): Invoice { }
}
```

**Benefits**:
- ✅ Single Responsibility
- ✅ Easy to test
- ✅ Easy to maintain
- ✅ Clear separation

---

## Anti-Pattern 5: Primitive Obsession

### Problem

Using primitives (string, int) instead of value objects.

### Before (❌ Anti-Pattern)

```php
class Order
{
    private string $email; // Just a string
    private int $total; // Just an int
    
    public function __construct(string $email, int $total)
    {
        // No validation
        $this->email = $email;
        $this->total = $total;
    }
}

// Usage - can pass invalid data
$order = new Order('invalid-email', -1000); // No error!
```

**Problems**:
- No validation
- Can create invalid objects
- Logic scattered everywhere
- Hard to maintain

### After (✅ Value Objects)

```php
// Value Objects
final class Email
{
    private string $value;
    
    public function __construct(string $value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email');
        }
        $this->value = strtolower($value);
    }
    
    public function getValue(): string
    {
        return $this->value;
    }
}

final class Money
{
    private int $amount;
    
    public function __construct(int $amount)
    {
        if ($amount < 0) {
            throw new \InvalidArgumentException('Amount cannot be negative');
        }
        $this->amount = $amount;
    }
    
    public function getAmount(): int
    {
        return $this->amount;
    }
}

// Entity
class Order
{
    private Email $email;
    private Money $total;
    
    public function __construct(Email $email, Money $total)
    {
        $this->email = $email;
        $this->total = $total;
    }
}

// Usage - impossible to create invalid object
$order = new Order(
    new Email('test@example.com'), // Validates
    new Money(1000) // Validates
);

$invalid = new Order(
    new Email('invalid'), // Throws exception
    new Money(-100) // Throws exception
);
```

**Benefits**:
- ✅ Self-validating
- ✅ Type safety
- ✅ Encapsulated logic
- ✅ Impossible to create invalid objects

---

## Anti-Pattern 6: Leaky Abstractions

### Problem

Infrastructure details leak into domain layer.

### Before (❌ Anti-Pattern)

```php
// Domain entity depending on Eloquent
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['email', 'total'];
    
    public function confirm(): void
    {
        $this->status = 'confirmed';
        $this->save(); // Infrastructure in domain!
    }
}

// Repository returning Eloquent model
interface OrderRepository
{
    public function getById(int $id): Model; // Leaking Eloquent!
}
```

**Problems**:
- Domain depends on framework
- Hard to test
- Hard to switch frameworks
- Violates Dependency Inversion

### After (✅ Clean Abstraction)

```php
// Pure domain entity
class Order
{
    private OrderId $id;
    private Email $email;
    private Money $total;
    private OrderStatus $status;
    
    public function confirm(): void
    {
        if ($this->status !== OrderStatus::PENDING) {
            throw new \DomainException('Cannot confirm non-pending order');
        }
        
        $this->status = OrderStatus::CONFIRMED;
    }
    
    // No save() method - that's repository's job
}

// Repository interface in domain
interface OrderRepository
{
    public function save(Order $order): void;
    public function getById(OrderId $id): Order; // Returns domain entity
}

// Implementation in infrastructure
class EloquentOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        OrderModel::updateOrCreate(
            ['id' => $order->getId()->getValue()],
            [
                'email' => $order->getEmail()->getValue(),
                'total' => $order->getTotal()->getAmount(),
                'status' => $order->getStatus()->value
            ]
        );
    }
    
    public function getById(OrderId $id): Order
    {
        $model = OrderModel::findOrFail($id->getValue());
        
        // Map Eloquent model to domain entity
        return new Order(
            new OrderId($model->id),
            new Email($model->email),
            new Money($model->total),
            OrderStatus::from($model->status)
        );
    }
}
```

**Benefits**:
- ✅ Domain is framework-independent
- ✅ Easy to test
- ✅ Easy to switch infrastructure
- ✅ Clean separation

---

## Refactoring Checklist

For each anti-pattern found:

- [ ] Identify the anti-pattern
- [ ] Write tests for current behavior
- [ ] Refactor incrementally
- [ ] Ensure tests still pass
- [ ] Remove old code
- [ ] Update documentation

## Quick Reference

| Anti-Pattern | Solution |
|--------------|----------|
| Fat Controller | Thin Controller + Handler |
| Anemic Domain | Rich Domain Model |
| Service Locator | Dependency Injection |
| God Object | Single Responsibility |
| Primitive Obsession | Value Objects |
| Leaky Abstraction | Clean Interfaces |

---

**Remember**: Refactoring is continuous. Always be improving!
