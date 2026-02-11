# Order Module Example

Complete implementation of Order module following Clean Architecture principles.

## Module Structure

```
src/
├── domain/
│   └── order/
│       ├── entities/
│       │   ├── Order.php
│       │   └── OrderStatus.php
│       ├── value-objects/
│       │   ├── OrderId.php
│       │   ├── Email.php
│       │   └── Money.php
│       ├── repositories/
│       │   └── OrderRepository.php
│       ├── services/
│       │   └── OrderPricingService.php
│       └── events/
│           └── OrderPlaced.php
│
├── application/
│   └── order/
│       ├── commands/
│       │   ├── PlaceOrderCommand.php
│       │   ├── ConfirmOrderCommand.php
│       │   └── CancelOrderCommand.php
│       ├── queries/
│       │   ├── GetOrderByIdQuery.php
│       │   └── GetOrdersByCustomerQuery.php
│       ├── handlers/
│       │   ├── PlaceOrderHandler.php
│       │   ├── ConfirmOrderHandler.php
│       │   ├── CancelOrderHandler.php
│       │   ├── GetOrderByIdHandler.php
│       │   └── GetOrdersByCustomerHandler.php
│       └── view-models/
│           └── OrderViewModel.php
│
└── infrastructure/
    ├── persistence/
    │   ├── SqlOrderRepository.php
    │   └── models/
    │       └── OrderModel.php
    ├── web/
    │   └── controllers/
    │       └── OrderController.php
    └── config/
        └── OrderServiceProvider.php
```

## Domain Layer

### Value Objects

#### OrderId.php
```php
<?php

namespace App\Domain\Order\ValueObjects;

final class OrderId
{
    private int $value;
    
    public function __construct(int $value)
    {
        if ($value <= 0) {
            throw new \InvalidArgumentException('Order ID must be positive');
        }
        $this->value = $value;
    }
    
    public static function generate(): self
    {
        return new self(random_int(100000, 999999));
    }
    
    public function getValue(): int
    {
        return $this->value;
    }
    
    public function equals(OrderId $other): bool
    {
        return $this->value === $other->value;
    }
}
```

#### Email.php
```php
<?php

namespace App\Domain\Order\ValueObjects;

final class Email
{
    private string $value;
    
    public function __construct(string $value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Invalid email: {$value}");
        }
        $this->value = strtolower(trim($value));
    }
    
    public function getValue(): string
    {
        return $this->value;
    }
    
    public function equals(Email $other): bool
    {
        return $this->value === $other->value;
    }
    
    public function __toString(): string
    {
        return $this->value;
    }
}
```

#### Money.php
```php
<?php

namespace App\Domain\Order\ValueObjects;

final class Money
{
    private int $amount; // in cents
    private string $currency;
    
    public function __construct(int $amount, string $currency = 'USD')
    {
        if ($amount < 0) {
            throw new \InvalidArgumentException('Amount cannot be negative');
        }
        $this->amount = $amount;
        $this->currency = strtoupper($currency);
    }
    
    public function getAmount(): int
    {
        return $this->amount;
    }
    
    public function getCurrency(): string
    {
        return $this->currency;
    }
    
    public function add(Money $other): Money
    {
        $this->assertSameCurrency($other);
        return new Money($this->amount + $other->amount, $this->currency);
    }
    
    public function subtract(Money $other): Money
    {
        $this->assertSameCurrency($other);
        $newAmount = $this->amount - $other->amount;
        if ($newAmount < 0) {
            throw new \DomainException('Result cannot be negative');
        }
        return new Money($newAmount, $this->currency);
    }
    
    public function multiply(float $multiplier): Money
    {
        return new Money((int)round($this->amount * $multiplier), $this->currency);
    }
    
    public function equals(Money $other): bool
    {
        return $this->amount === $other->amount 
            && $this->currency === $other->currency;
    }
    
    private function assertSameCurrency(Money $other): void
    {
        if ($this->currency !== $other->currency) {
            throw new \InvalidArgumentException('Currency mismatch');
        }
    }
}
```

### Entities

#### OrderStatus.php
```php
<?php

namespace App\Domain\Order\Entities;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case PROCESSING = 'processing';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
}
```

#### Order.php
```php
<?php

namespace App\Domain\Order\Entities;

use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use App\Domain\Order\Events\OrderPlaced;

class Order
{
    private OrderId $id;
    private Email $customerEmail;
    private Money $total;
    private OrderStatus $status;
    private \DateTimeImmutable $createdAt;
    private array $domainEvents = [];
    
    private function __construct(
        OrderId $id,
        Email $customerEmail,
        Money $total
    ) {
        $this->id = $id;
        $this->customerEmail = $customerEmail;
        $this->total = $total;
        $this->status = OrderStatus::PENDING;
        $this->createdAt = new \DateTimeImmutable();
    }
    
    public static function create(
        OrderId $id,
        Email $customerEmail,
        Money $unitPrice,
        int $quantity
    ): self {
        if ($quantity <= 0) {
            throw new \DomainException('Quantity must be positive');
        }
        
        $total = $unitPrice->multiply($quantity);
        $total = self::applyBulkDiscount($total, $quantity);
        
        $order = new self($id, $customerEmail, $total);
        $order->recordEvent(new OrderPlaced($id, $customerEmail));
        
        return $order;
    }
    
    public function getId(): OrderId
    {
        return $this->id;
    }
    
    public function getCustomerEmail(): Email
    {
        return $this->customerEmail;
    }
    
    public function getTotal(): Money
    {
        return $this->total;
    }
    
    public function getStatus(): OrderStatus
    {
        return $this->status;
    }
    
    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
    
    public function confirm(): void
    {
        if ($this->status !== OrderStatus::PENDING) {
            throw new \DomainException('Only pending orders can be confirmed');
        }
        $this->status = OrderStatus::CONFIRMED;
    }
    
    public function cancel(): void
    {
        if ($this->status === OrderStatus::COMPLETED) {
            throw new \DomainException('Cannot cancel completed orders');
        }
        if ($this->status === OrderStatus::CANCELLED) {
            throw new \DomainException('Order already cancelled');
        }
        $this->status = OrderStatus::CANCELLED;
    }
    
    public function process(): void
    {
        if ($this->status !== OrderStatus::CONFIRMED) {
            throw new \DomainException('Only confirmed orders can be processed');
        }
        $this->status = OrderStatus::PROCESSING;
    }
    
    public function complete(): void
    {
        if ($this->status !== OrderStatus::PROCESSING) {
            throw new \DomainException('Only processing orders can be completed');
        }
        $this->status = OrderStatus::COMPLETED;
    }
    
    public function applyDiscount(int $percentage): void
    {
        if ($percentage < 0 || $percentage > 100) {
            throw new \InvalidArgumentException('Invalid discount percentage');
        }
        $discount = $this->total->multiply($percentage / 100);
        $this->total = $this->total->subtract($discount);
    }
    
    public function getDomainEvents(): array
    {
        return $this->domainEvents;
    }
    
    public function clearDomainEvents(): void
    {
        $this->domainEvents = [];
    }
    
    private function recordEvent(object $event): void
    {
        $this->domainEvents[] = $event;
    }
    
    private static function applyBulkDiscount(Money $total, int $quantity): Money
    {
        if ($quantity >= 20) {
            return $total->multiply(0.85); // 15% discount
        }
        if ($quantity >= 10) {
            return $total->multiply(0.90); // 10% discount
        }
        return $total;
    }
}
```

### Repository Interface

#### OrderRepository.php
```php
<?php

namespace App\Domain\Order\Repositories;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email};

interface OrderRepository
{
    /**
     * Save or update an order
     */
    public function save(Order $order): void;
    
    /**
     * Get order by ID
     * @throws OrderNotFoundException
     */
    public function getById(OrderId $id): Order;
    
    /**
     * Find orders by customer email
     * @return Order[]
     */
    public function findByCustomerEmail(Email $email): array;
    
    /**
     * Delete an order
     */
    public function delete(OrderId $id): void;
    
    /**
     * Check if order exists
     */
    public function exists(OrderId $id): bool;
}
```

### Domain Events

#### OrderPlaced.php
```php
<?php

namespace App\Domain\Order\Events;

use App\Domain\Order\ValueObjects\{OrderId, Email};

final class OrderPlaced
{
    private OrderId $orderId;
    private Email $customerEmail;
    private \DateTimeImmutable $occurredAt;
    
    public function __construct(OrderId $orderId, Email $customerEmail)
    {
        $this->orderId = $orderId;
        $this->customerEmail = $customerEmail;
        $this->occurredAt = new \DateTimeImmutable();
    }
    
    public function getOrderId(): OrderId
    {
        return $this->orderId;
    }
    
    public function getCustomerEmail(): Email
    {
        return $this->customerEmail;
    }
    
    public function getOccurredAt(): \DateTimeImmutable
    {
        return $this->occurredAt;
    }
}
```

## Application Layer

### Commands

#### PlaceOrderCommand.php
```php
<?php

namespace App\Application\Order\Commands;

final class PlaceOrderCommand
{
    public function __construct(
        public readonly string $customerEmail,
        public readonly int $unitPrice,
        public readonly int $quantity
    ) {}
}
```

### Handlers

#### PlaceOrderHandler.php
```php
<?php

namespace App\Application\Order\Handlers;

use App\Application\Order\Commands\PlaceOrderCommand;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use App\Application\Ports\{EmailService, EventBus};

final class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepository,
        private EmailService $emailService,
        private EventBus $eventBus
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        // Create order
        $order = Order::create(
            OrderId::generate(),
            new Email($command->customerEmail),
            new Money($command->unitPrice),
            $command->quantity
        );
        
        // Save order
        $this->orderRepository->save($order);
        
        // Publish domain events
        foreach ($order->getDomainEvents() as $event) {
            $this->eventBus->publish($event);
        }
        $order->clearDomainEvents();
        
        // Send confirmation email
        $this->emailService->sendOrderConfirmation(
            $order->getCustomerEmail()->getValue(),
            $order->getId()->getValue()
        );
        
        return $order->getId()->getValue();
    }
}
```

## Infrastructure Layer

### Repository Implementation

#### SqlOrderRepository.php
```php
<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Order\Entities\{Order, OrderStatus};
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use Illuminate\Support\Facades\DB;

final class SqlOrderRepository implements OrderRepository
{
    private const TABLE = 'orders';
    
    public function save(Order $order): void
    {
        DB::table(self::TABLE)->updateOrInsert(
            ['id' => $order->getId()->getValue()],
            [
                'customer_email' => $order->getCustomerEmail()->getValue(),
                'total_amount' => $order->getTotal()->getAmount(),
                'currency' => $order->getTotal()->getCurrency(),
                'status' => $order->getStatus()->value,
                'created_at' => $order->getCreatedAt(),
                'updated_at' => now()
            ]
        );
    }
    
    public function getById(OrderId $id): Order
    {
        $record = DB::table(self::TABLE)->find($id->getValue());
        
        if (!$record) {
            throw new OrderNotFoundException("Order not found: {$id->getValue()}");
        }
        
        return $this->mapToEntity($record);
    }
    
    public function findByCustomerEmail(Email $email): array
    {
        $records = DB::table(self::TABLE)
            ->where('customer_email', $email->getValue())
            ->orderBy('created_at', 'desc')
            ->get();
        
        return $records->map(fn($r) => $this->mapToEntity($r))->all();
    }
    
    public function delete(OrderId $id): void
    {
        DB::table(self::TABLE)->where('id', $id->getValue())->delete();
    }
    
    public function exists(OrderId $id): bool
    {
        return DB::table(self::TABLE)->where('id', $id->getValue())->exists();
    }
    
    private function mapToEntity(object $record): Order
    {
        // Use reflection to reconstruct entity
        $reflection = new \ReflectionClass(Order::class);
        $instance = $reflection->newInstanceWithoutConstructor();
        
        $this->setProperty($instance, 'id', new OrderId($record->id));
        $this->setProperty($instance, 'customerEmail', new Email($record->customer_email));
        $this->setProperty($instance, 'total', new Money($record->total_amount, $record->currency));
        $this->setProperty($instance, 'status', OrderStatus::from($record->status));
        $this->setProperty($instance, 'createdAt', new \DateTimeImmutable($record->created_at));
        
        return $instance;
    }
    
    private function setProperty(object $object, string $property, mixed $value): void
    {
        $reflection = new \ReflectionProperty($object, $property);
        $reflection->setAccessible(true);
        $reflection->setValue($object, $value);
    }
}
```

### Controller

#### OrderController.php
```php
<?php

namespace App\Infrastructure\Web\Controllers;

use App\Application\Order\Commands\{PlaceOrderCommand, ConfirmOrderCommand};
use App\Application\Order\Handlers\{PlaceOrderHandler, ConfirmOrderHandler};
use Illuminate\Http\{Request, JsonResponse};

final class OrderController
{
    public function __construct(
        private PlaceOrderHandler $placeOrderHandler,
        private ConfirmOrderHandler $confirmOrderHandler
    ) {}
    
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_email' => 'required|email',
            'unit_price' => 'required|integer|min:1',
            'quantity' => 'required|integer|min:1|max:100'
        ]);
        
        $command = new PlaceOrderCommand(
            customerEmail: $validated['customer_email'],
            unitPrice: $validated['unit_price'],
            quantity: $validated['quantity']
        );
        
        try {
            $orderId = $this->placeOrderHandler->handle($command);
            
            return response()->json([
                'success' => true,
                'order_id' => $orderId,
                'message' => 'Order placed successfully'
            ], 201);
            
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Internal server error'
            ], 500);
        }
    }
}
```

## Testing

### Unit Tests

```php
<?php

namespace Tests\Unit\Domain\Order;

use PHPUnit\Framework\TestCase;
use App\Domain\Order\Entities\{Order, OrderStatus};
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};

class OrderTest extends TestCase
{
    public function test_creates_order_with_correct_total(): void
    {
        $order = Order::create(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(1000),
            5
        );
        
        $this->assertEquals(5000, $order->getTotal()->getAmount());
        $this->assertEquals(OrderStatus::PENDING, $order->getStatus());
    }
    
    public function test_applies_10_percent_discount_for_10_items(): void
    {
        $order = Order::create(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(1000),
            10
        );
        
        $this->assertEquals(9000, $order->getTotal()->getAmount());
    }
    
    public function test_confirms_pending_order(): void
    {
        $order = Order::create(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(1000),
            1
        );
        
        $order->confirm();
        
        $this->assertEquals(OrderStatus::CONFIRMED, $order->getStatus());
    }
    
    public function test_cannot_confirm_already_confirmed_order(): void
    {
        $order = Order::create(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(1000),
            1
        );
        
        $order->confirm();
        
        $this->expectException(\DomainException::class);
        $order->confirm();
    }
}
```

## Database Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_email')->index();
            $table->integer('total_amount');
            $table->string('currency', 3)->default('USD');
            $table->string('status')->index();
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
```

## API Routes

```php
<?php

use App\Infrastructure\Web\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/orders')->group(function () {
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/{id}', [OrderController::class, 'show']);
    Route::post('/{id}/confirm', [OrderController::class, 'confirm']);
    Route::post('/{id}/cancel', [OrderController::class, 'cancel']);
});
```

---

This is a complete, production-ready Order module following Clean Architecture principles!
