# Decision Tree: Where to Put Code

## Quick Decision Flowchart

```
What does this code do?
│
├─ Handles HTTP request/response?
│   └─ YES → **Infrastructure/Web/Controller**
│
├─ Accesses database?
│   └─ YES → **Infrastructure/Persistence/Repository**
│
├─ Calls external API/service?
│   └─ YES → **Infrastructure/External/Adapter**
│
├─ Orchestrates a use case?
│   └─ YES → **Application/Handler or Service**
│
├─ Business logic for one entity?
│   └─ YES → **Domain/Entity**
│
├─ Business logic for multiple entities?
│   └─ YES → **Domain/Service**
│
├─ Validates data format?
│   └─ YES → **Domain/ValueObject**
│
└─ Defines data access contract?
    └─ YES → **Domain/Repository Interface**
```

## Layer-by-Layer Guide

### Domain Layer

**Put code here if it**:
- ✅ Contains business rules
- ✅ Works with domain concepts
- ✅ Can run without framework
- ✅ Can run without database
- ✅ Is pure business logic

**Examples**:
```php
// Domain/Order/Entities/Order.php
class Order {
    public function calculateTotal(): Money { }
    public function applyDiscount(int $percentage): void { }
    public function confirm(): void { }
}

// Domain/Order/ValueObjects/Email.php
final class Email {
    public function __construct(string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException();
        }
    }
}

// Domain/Order/Repositories/OrderRepository.php (interface only)
interface OrderRepository {
    public function save(Order $order): void;
}

// Domain/Order/Services/PricingService.php
final class PricingService {
    public function calculateShipping(Order $order, Address $address): Money { }
}
```

### Application Layer

**Put code here if it**:
- ✅ Orchestrates use cases
- ✅ Coordinates domain objects
- ✅ Uses repositories (interfaces)
- ✅ Manages transactions
- ❌ No HTTP/database/external dependencies

**Examples**:
```php
// Application/Order/Commands/PlaceOrderCommand.php
final class PlaceOrderCommand {
    public function __construct(
        public readonly int $ebookId,
        public readonly string $email,
        public readonly int $quantity
    ) {}
}

// Application/Order/Handlers/PlaceOrderHandler.php
final class PlaceOrderHandler {
    public function __construct(
        private OrderRepository $orderRepo,
        private EbookRepository $ebookRepo
    ) {}
    
    public function handle(PlaceOrderCommand $command): int {
        $ebook = $this->ebookRepo->getById($command->ebookId);
        $order = Order::create(...);
        $this->orderRepo->save($order);
        return $order->getId()->getValue();
    }
}

// Application/Order/ViewModels/OrderViewModel.php
final class OrderViewModel {
    public function __construct(
        public readonly int $id,
        public readonly string $email,
        public readonly int $total
    ) {}
}
```

### Infrastructure Layer

**Put code here if it**:
- ✅ Handles HTTP requests
- ✅ Accesses database
- ✅ Calls external APIs
- ✅ Uses framework features
- ✅ Implements domain interfaces

**Examples**:
```php
// Infrastructure/Web/Controllers/OrderController.php
final class OrderController {
    public function store(Request $request): JsonResponse {
        $command = new PlaceOrderCommand(...);
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId]);
    }
}

// Infrastructure/Persistence/SqlOrderRepository.php
final class SqlOrderRepository implements OrderRepository {
    public function save(Order $order): void {
        DB::table('orders')->insert([...]);
    }
}

// Infrastructure/External/StripePaymentGateway.php
final class StripePaymentGateway implements PaymentGateway {
    public function charge(Money $amount): PaymentResult {
        return $this->stripe->charges->create([...]);
    }
}
```

## Common Code Scenarios

### Scenario 1: Validating Email Format

**Question**: Where does email validation go?

**Answer**: **Domain/ValueObject**

```php
// Domain/Shared/ValueObjects/Email.php
final class Email {
    private string $value;
    
    public function __construct(string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }
        $this->value = strtolower($value);
    }
}
```

**Why**: Format validation is a business rule about what constitutes a valid email.

### Scenario 2: Calculating Order Total

**Question**: Where does total calculation go?

**Answer**: **Domain/Entity**

```php
// Domain/Order/Entities/Order.php
class Order {
    public function calculateTotal(): Money {
        return $this->items->reduce(
            fn($total, $item) => $total->add($item->getSubtotal()),
            new Money(0)
        );
    }
}
```

**Why**: Calculation logic belongs to the Order entity.

### Scenario 3: Saving Order to Database

**Question**: Where does database save logic go?

**Answer**: **Infrastructure/Repository Implementation**

```php
// Infrastructure/Persistence/SqlOrderRepository.php
final class SqlOrderRepository implements OrderRepository {
    public function save(Order $order): void {
        DB::table('orders')->updateOrInsert(
            ['id' => $order->getId()->getValue()],
            [
                'email' => $order->getEmail()->getValue(),
                'total' => $order->getTotal()->getAmount()
            ]
        );
    }
}
```

**Why**: Database access is infrastructure concern.

### Scenario 4: Creating an Order

**Question**: Where does order creation flow go?

**Answer**: **Application/Handler**

```php
// Application/Order/Handlers/PlaceOrderHandler.php
final class PlaceOrderHandler {
    public function handle(PlaceOrderCommand $command): int {
        // Orchestrate the use case
        $ebook = $this->ebookRepo->getById($command->ebookId);
        $order = Order::create(...);
        $this->orderRepo->save($order);
        return $order->getId()->getValue();
    }
}
```

**Why**: Orchestrating a complete use case is application layer responsibility.

### Scenario 5: Handling HTTP Request

**Question**: Where does HTTP handling go?

**Answer**: **Infrastructure/Controller**

```php
// Infrastructure/Web/Controllers/OrderController.php
final class OrderController {
    public function store(Request $request): JsonResponse {
        $validated = $request->validate([...]);
        $command = new PlaceOrderCommand(...);
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId], 201);
    }
}
```

**Why**: HTTP is infrastructure concern.

### Scenario 6: Sending Email Notification

**Question**: Where does email sending go?

**Answer**: **Infrastructure/Adapter** (implementation) + **Application/Port** (interface)

```php
// Application/Ports/EmailService.php (interface)
interface EmailService {
    public function sendOrderConfirmation(string $email, int $orderId): void;
}

// Infrastructure/External/LaravelEmailService.php (implementation)
final class LaravelEmailService implements EmailService {
    public function sendOrderConfirmation(string $email, int $orderId): void {
        Mail::to($email)->send(new OrderConfirmationMail($orderId));
    }
}
```

**Why**: Email sending is external service (infrastructure), but interface is defined in application.

### Scenario 7: Transferring Money Between Accounts

**Question**: Where does money transfer logic go?

**Answer**: **Domain/Service**

```php
// Domain/Account/Services/MoneyTransferService.php
final class MoneyTransferService {
    public function transfer(Account $from, Account $to, Money $amount): void {
        if (!$from->canWithdraw($amount)) {
            throw new InsufficientFundsException();
        }
        
        $from->withdraw($amount);
        $to->deposit($amount);
    }
}
```

**Why**: Logic involves multiple entities, but is pure business logic.

### Scenario 8: Formatting Date for Display

**Question**: Where does date formatting go?

**Answer**: **Application/ViewModel** or **Infrastructure/Presenter**

```php
// Application/Order/ViewModels/OrderViewModel.php
final class OrderViewModel {
    public function __construct(
        public readonly int $id,
        public readonly string $createdAt // Already formatted
    ) {}
    
    public static function fromEntity(Order $order): self {
        return new self(
            $order->getId()->getValue(),
            $order->getCreatedAt()->format('Y-m-d H:i:s')
        );
    }
}
```

**Why**: Presentation formatting is application/infrastructure concern, not domain.

## Decision Matrix

| Code Type | Domain | Application | Infrastructure |
|-----------|--------|-------------|----------------|
| Business rules | ✅ | ❌ | ❌ |
| Validation | ✅ | ❌ | ❌ |
| Calculations | ✅ | ❌ | ❌ |
| Use case orchestration | ❌ | ✅ | ❌ |
| Transaction management | ❌ | ✅ | ❌ |
| HTTP handling | ❌ | ❌ | ✅ |
| Database access | ❌ | ❌ | ✅ |
| External API calls | ❌ | ❌ | ✅ |
| Framework code | ❌ | ❌ | ✅ |

## Common Mistakes

### ❌ Mistake 1: Business Logic in Controller

```php
// Wrong - Infrastructure
class OrderController {
    public function store(Request $request) {
        $total = $request->quantity * $request->price; // Business logic!
        DB::table('orders')->insert(['total' => $total]);
    }
}
```

**Fix**: Move to domain entity
```php
// Domain
class Order {
    public function __construct(int $quantity, Money $price) {
        $this->total = $price->multiply($quantity);
    }
}

// Infrastructure
class OrderController {
    public function store(Request $request) {
        $command = new PlaceOrderCommand(...);
        $this->handler->handle($command);
    }
}
```

### ❌ Mistake 2: Database Access in Domain

```php
// Wrong - Domain
class Order {
    public function save(): void {
        DB::table('orders')->insert([...]); // Infrastructure in domain!
    }
}
```

**Fix**: Use repository
```php
// Domain - Interface
interface OrderRepository {
    public function save(Order $order): void;
}

// Infrastructure - Implementation
class SqlOrderRepository implements OrderRepository {
    public function save(Order $order): void {
        DB::table('orders')->insert([...]);
    }
}
```

### ❌ Mistake 3: Use Case Logic in Entity

```php
// Wrong - Domain
class Order {
    public function placeOrder(): void {
        $this->validate();
        $this->save(); // Orchestration in entity!
        $this->sendEmail();
    }
}
```

**Fix**: Move to application handler
```php
// Application
class PlaceOrderHandler {
    public function handle(PlaceOrderCommand $command): int {
        $order = Order::create(...);
        $this->orderRepo->save($order);
        $this->emailService->sendConfirmation(...);
        return $order->getId()->getValue();
    }
}
```

## Quick Reference Checklist

### Domain Layer
- [ ] Pure business logic
- [ ] No framework dependencies
- [ ] No database access
- [ ] No HTTP handling
- [ ] Can run in isolation

### Application Layer
- [ ] Orchestrates use cases
- [ ] Uses domain entities
- [ ] Uses repository interfaces
- [ ] No business logic
- [ ] No infrastructure dependencies

### Infrastructure Layer
- [ ] Implements interfaces
- [ ] Handles HTTP/DB/External services
- [ ] Framework-specific code
- [ ] No business logic

## Summary

**Golden Rule**: Follow the dependency direction

```
Infrastructure → Application → Domain
   (outer)         (middle)      (core)
```

- **Domain**: What the business does
- **Application**: How use cases flow
- **Infrastructure**: How we connect to the outside world

---

**When in doubt**: Ask yourself "Can this code run without a database/framework/HTTP?" If yes → Domain/Application. If no → Infrastructure.
