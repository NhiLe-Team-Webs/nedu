# Guide 03: Application Layer

## Overview

The Application Layer orchestrates use cases and coordinates domain logic. It sits between the domain and infrastructure layers, defining how the application responds to user actions.

## Purpose

**Application Layer**:
- ✅ Implements use cases (user stories)
- ✅ Orchestrates domain entities
- ✅ Coordinates transactions
- ✅ Defines application-specific interfaces (ports)

**Application Layer Does NOT**:
- ❌ Contain business logic (that's in domain)
- ❌ Access databases directly (uses repositories)
- ❌ Handle HTTP requests (that's infrastructure)
- ❌ Depend on infrastructure layer

## Building Blocks

### 1. Commands (Write Operations)

Commands represent intentions to change system state.

```php
<?php

namespace App\Application\Order\Commands;

final class PlaceOrderCommand
{
    public function __construct(
        public readonly int $ebookId,
        public readonly string $customerEmail,
        public readonly int $quantity
    ) {}
}
```

**Characteristics**:
- Immutable DTOs (Data Transfer Objects)
- No business logic
- Simple data containers
- Represent user intentions

### 2. Queries (Read Operations)

Queries represent requests for data.

```php
<?php

namespace App\Application\Order\Queries;

final class GetOrderByIdQuery
{
    public function __construct(
        public readonly int $orderId
    ) {}
}
```

### 3. Handlers (Use Case Implementation)

Handlers execute commands and queries.

**Command Handler Example**:

```php
<?php

namespace App\Application\Order\Handlers;

use App\Application\Order\Commands\PlaceOrderCommand;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use App\Domain\Ebook\Repositories\EbookRepository;

final class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepository,
        private EbookRepository $ebookRepository
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        // 1. Fetch required data
        $ebook = $this->ebookRepository->getById($command->ebookId);
        
        // 2. Create domain entity
        $order = new Order(
            OrderId::generate(),
            new Email($command->customerEmail),
            $ebook->getPrice()->multiply($command->quantity)
        );
        
        // 3. Save via repository
        $this->orderRepository->save($order);
        
        // 4. Return result
        return $order->getId()->getValue();
    }
}
```

**Query Handler Example**:

```php
<?php

namespace App\Application\Order\Handlers;

use App\Application\Order\Queries\GetOrderByIdQuery;
use App\Application\Order\ViewModels\OrderViewModel;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\OrderId;

final class GetOrderByIdHandler
{
    public function __construct(
        private OrderRepository $orderRepository
    ) {}
    
    public function handle(GetOrderByIdQuery $query): OrderViewModel
    {
        $order = $this->orderRepository->getById(
            new OrderId($query->orderId)
        );
        
        return new OrderViewModel(
            $order->getId()->getValue(),
            $order->getCustomerEmail()->getValue(),
            $order->getTotalAmount()->getAmount(),
            $order->getStatus()->value
        );
    }
}
```

### 4. View Models (Read DTOs)

View models format data for presentation.

```php
<?php

namespace App\Application\Order\ViewModels;

final class OrderViewModel
{
    public function __construct(
        public readonly int $id,
        public readonly string $customerEmail,
        public readonly int $totalAmount,
        public readonly string $status
    ) {}
    
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer_email' => $this->customerEmail,
            'total_amount' => $this->totalAmount / 100, // Convert cents to dollars
            'status' => $this->status
        ];
    }
}
```

### 5. Application Services

For complex use cases involving multiple handlers.

```php
<?php

namespace App\Application\Order\Services;

use App\Application\Order\Commands\PlaceOrderCommand;
use App\Application\Order\Handlers\PlaceOrderHandler;
use App\Domain\Order\Events\OrderPlaced;
use App\Application\Ports\EventBus;
use App\Application\Ports\EmailService;

final class OrderService
{
    public function __construct(
        private PlaceOrderHandler $placeOrderHandler,
        private EventBus $eventBus,
        private EmailService $emailService
    ) {}
    
    public function placeOrder(PlaceOrderCommand $command): int
    {
        // Execute main use case
        $orderId = $this->placeOrderHandler->handle($command);
        
        // Publish domain event
        $this->eventBus->publish(new OrderPlaced(
            new OrderId($orderId),
            new Email($command->customerEmail)
        ));
        
        // Send confirmation email
        $this->emailService->sendOrderConfirmation(
            $command->customerEmail,
            $orderId
        );
        
        return $orderId;
    }
}
```

### 6. Ports (Application Interfaces)

Ports define contracts for external services.

```php
<?php

namespace App\Application\Ports;

interface EmailService
{
    public function sendOrderConfirmation(string $email, int $orderId): void;
    public function sendPasswordReset(string $email, string $token): void;
}
```

```php
<?php

namespace App\Application\Ports;

interface EventBus
{
    public function publish(object $event): void;
}
```

## Use Case Patterns

### Pattern 1: Simple CRUD

```php
class CreateUserHandler
{
    public function __construct(private UserRepository $userRepo) {}
    
    public function handle(CreateUserCommand $command): int
    {
        $user = new User(
            UserId::generate(),
            new Email($command->email),
            new HashedPassword($command->password)
        );
        
        $this->userRepo->save($user);
        
        return $user->getId()->getValue();
    }
}
```

### Pattern 2: Multi-Step Transaction

```php
class ProcessPaymentHandler
{
    public function __construct(
        private OrderRepository $orderRepo,
        private PaymentGateway $paymentGateway,
        private TransactionManager $transactionManager
    ) {}
    
    public function handle(ProcessPaymentCommand $command): void
    {
        $this->transactionManager->begin();
        
        try {
            // 1. Get order
            $order = $this->orderRepo->getById(new OrderId($command->orderId));
            
            // 2. Process payment
            $paymentResult = $this->paymentGateway->charge(
                $command->paymentMethod,
                $order->getTotalAmount()
            );
            
            // 3. Update order
            $order->markAsPaid($paymentResult->getTransactionId());
            $this->orderRepo->save($order);
            
            $this->transactionManager->commit();
        } catch (\Exception $e) {
            $this->transactionManager->rollback();
            throw $e;
        }
    }
}
```

### Pattern 3: Validation Before Execution

```php
class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepo,
        private EbookRepository $ebookRepo,
        private OrderValidator $validator
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        // Validate command
        $errors = $this->validator->validate($command);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }
        
        // Execute use case
        $ebook = $this->ebookRepo->getById($command->ebookId);
        
        if (!$ebook->isAvailable()) {
            throw new DomainException('Ebook not available');
        }
        
        $order = Order::createFromEbook(
            OrderId::generate(),
            new Email($command->customerEmail),
            $ebook,
            $command->quantity
        );
        
        $this->orderRepo->save($order);
        
        return $order->getId()->getValue();
    }
}
```

## Testing Application Layer

### Unit Test with Fakes

```php
<?php

namespace Tests\Unit\Application\Order;

use PHPUnit\Framework\TestCase;
use App\Application\Order\Commands\PlaceOrderCommand;
use App\Application\Order\Handlers\PlaceOrderHandler;
use Tests\Fakes\InMemoryOrderRepository;
use Tests\Fakes\InMemoryEbookRepository;

class PlaceOrderHandlerTest extends TestCase
{
    private PlaceOrderHandler $handler;
    private InMemoryOrderRepository $orderRepo;
    private InMemoryEbookRepository $ebookRepo;
    
    protected function setUp(): void
    {
        $this->orderRepo = new InMemoryOrderRepository();
        $this->ebookRepo = new InMemoryEbookRepository();
        $this->handler = new PlaceOrderHandler($this->orderRepo, $this->ebookRepo);
        
        // Setup test data
        $this->ebookRepo->addEbook(new Ebook(1, 'Test Book', new Money(1000)));
    }
    
    public function test_places_order_successfully(): void
    {
        $command = new PlaceOrderCommand(
            ebookId: 1,
            customerEmail: 'test@example.com',
            quantity: 2
        );
        
        $orderId = $this->handler->handle($command);
        
        $this->assertNotNull($orderId);
        $this->assertCount(1, $this->orderRepo->getAll());
        
        $savedOrder = $this->orderRepo->getById(new OrderId($orderId));
        $this->assertEquals('test@example.com', $savedOrder->getCustomerEmail()->getValue());
        $this->assertEquals(2000, $savedOrder->getTotalAmount()->getAmount());
    }
    
    public function test_throws_exception_for_invalid_ebook(): void
    {
        $command = new PlaceOrderCommand(
            ebookId: 999, // Non-existent
            customerEmail: 'test@example.com',
            quantity: 1
        );
        
        $this->expectException(EbookNotFoundException::class);
        $this->handler->handle($command);
    }
}
```

### In-Memory Repository for Testing

```php
<?php

namespace Tests\Fakes;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\OrderId;

class InMemoryOrderRepository implements OrderRepository
{
    private array $orders = [];
    private int $nextId = 1;
    
    public function save(Order $order): void
    {
        $this->orders[$order->getId()->getValue()] = $order;
    }
    
    public function getById(OrderId $id): Order
    {
        if (!isset($this->orders[$id->getValue()])) {
            throw new OrderNotFoundException();
        }
        
        return $this->orders[$id->getValue()];
    }
    
    public function getAll(): array
    {
        return array_values($this->orders);
    }
    
    public function clear(): void
    {
        $this->orders = [];
        $this->nextId = 1;
    }
}
```

## Best Practices

1. **Keep handlers focused**: One handler, one use case
2. **Use dependency injection**: Inject repositories and services
3. **Separate commands and queries**: CQRS pattern
4. **Return simple types**: Primitives or view models, not entities
5. **Handle transactions**: Use transaction managers for multi-step operations
6. **Validate early**: Check preconditions before executing logic

## Common Mistakes

❌ **Business Logic in Handler**:
```php
class PlaceOrderHandler {
    public function handle($command) {
        // Calculating discount in handler
        if ($command->quantity > 10) {
            $discount = 0.1;
        }
        // This belongs in domain!
    }
}
```

✅ **Business Logic in Domain**:
```php
class PlaceOrderHandler {
    public function handle($command) {
        $order = Order::create(...);
        $order->applyBulkDiscount(); // Domain handles logic
        $this->orderRepo->save($order);
    }
}
```

❌ **Direct Infrastructure Access**:
```php
class PlaceOrderHandler {
    public function handle($command) {
        DB::table('orders')->insert([...]); // Direct DB access!
    }
}
```

✅ **Use Repository**:
```php
class PlaceOrderHandler {
    public function handle($command) {
        $order = new Order(...);
        $this->orderRepo->save($order); // Through repository
    }
}
```

## Next Steps

- Read `04-infrastructure-layer.md` to implement controllers
- Read `06-dependency-injection.md` to wire everything together
- Check `templates/application/` for code templates

---

**Remember**: Application layer orchestrates, domain layer decides!
