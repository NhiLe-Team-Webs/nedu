# Guide 07: Testing Strategy

## Overview

Clean Architecture makes testing easier by separating concerns. This guide covers the testing pyramid and strategies for each layer.

## Test Pyramid

```
         /\
        /E2E\      ← Few (Slow, Expensive)
       /------\
      /        \
     /Integration\ ← Some (Medium Speed)
    /------------\
   /              \
  /  Unit Tests    \ ← Many (Fast, Cheap)
 /------------------\
```

**Recommended Distribution**:
- Unit Tests: 70%
- Integration Tests: 20%
- E2E Tests: 10%

## Unit Tests (Domain & Application)

### Testing Domain Entities

```php
<?php

namespace Tests\Unit\Domain\Order;

use PHPUnit\Framework\TestCase;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};

class OrderTest extends TestCase
{
    public function test_creates_order_with_valid_data(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $this->assertEquals(1, $order->getId()->getValue());
        $this->assertEquals(10000, $order->getTotalAmount()->getAmount());
    }
    
    public function test_throws_exception_for_invalid_email(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        
        new Order(
            new OrderId(1),
            new Email('invalid-email'),
            new Money(10000)
        );
    }
    
    public function test_applies_discount_correctly(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $order->applyDiscount(10); // 10%
        
        $this->assertEquals(9000, $order->getTotalAmount()->getAmount());
    }
    
    public function test_confirms_pending_order(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $order->confirm();
        
        $this->assertEquals(OrderStatus::CONFIRMED, $order->getStatus());
    }
    
    public function test_cannot_confirm_already_confirmed_order(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $order->confirm();
        
        $this->expectException(\DomainException::class);
        $order->confirm();
    }
}
```

### Testing Application Handlers

```php
<?php

namespace Tests\Unit\Application\Order;

use PHPUnit\Framework\TestCase;
use App\Application\Order\Commands\PlaceOrderCommand;
use App\Application\Order\Handlers\PlaceOrderHandler;
use Tests\Fakes\{InMemoryOrderRepository, InMemoryEbookRepository};

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
        
        $order = $this->orderRepo->getById(new OrderId($orderId));
        $this->assertEquals('test@example.com', $order->getCustomerEmail()->getValue());
        $this->assertEquals(2000, $order->getTotalAmount()->getAmount());
    }
    
    public function test_throws_exception_for_invalid_ebook(): void
    {
        $command = new PlaceOrderCommand(
            ebookId: 999,
            customerEmail: 'test@example.com',
            quantity: 1
        );
        
        $this->expectException(EbookNotFoundException::class);
        $this->handler->handle($command);
    }
}
```

### Fake Repository Implementation

```php
<?php

namespace Tests\Fakes;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;

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

## Integration Tests (Infrastructure)

### Testing Repository with Real Database

```php
<?php

namespace Tests\Integration\Infrastructure;

use Tests\TestCase;
use App\Infrastructure\Persistence\SqlOrderRepository;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use Illuminate\Foundation\Testing\RefreshDatabase;

class SqlOrderRepositoryTest extends TestCase
{
    use RefreshDatabase;
    
    private SqlOrderRepository $repository;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new SqlOrderRepository();
    }
    
    public function test_saves_and_retrieves_order(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $this->repository->save($order);
        
        $retrieved = $this->repository->getById(new OrderId(1));
        
        $this->assertEquals(1, $retrieved->getId()->getValue());
        $this->assertEquals('test@example.com', $retrieved->getCustomerEmail()->getValue());
        $this->assertEquals(10000, $retrieved->getTotalAmount()->getAmount());
        
        $this->assertDatabaseHas('orders', [
            'id' => 1,
            'customer_email' => 'test@example.com',
            'total_amount' => 10000
        ]);
    }
    
    public function test_updates_existing_order(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $this->repository->save($order);
        
        $order->confirm();
        $this->repository->save($order);
        
        $retrieved = $this->repository->getById(new OrderId(1));
        $this->assertEquals(OrderStatus::CONFIRMED, $retrieved->getStatus());
    }
}
```

### Testing Controllers (Feature Tests)

```php
<?php

namespace Tests\Feature\Infrastructure\Web;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_creates_order_successfully(): void
    {
        $response = $this->postJson('/api/orders', [
            'ebook_id' => 1,
            'email' => 'test@example.com',
            'quantity' => 2
        ]);
        
        $response->assertStatus(201)
            ->assertJson(['success' => true])
            ->assertJsonStructure(['order_id']);
        
        $this->assertDatabaseHas('orders', [
            'customer_email' => 'test@example.com'
        ]);
    }
    
    public function test_validates_request_data(): void
    {
        $response = $this->postJson('/api/orders', [
            'ebook_id' => 1,
            'email' => 'invalid-email',
            'quantity' => -1
        ]);
        
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'quantity']);
    }
    
    public function test_returns_404_for_nonexistent_order(): void
    {
        $response = $this->getJson('/api/orders/999');
        
        $response->assertStatus(404);
    }
}
```

## E2E Tests

```php
<?php

namespace Tests\E2E;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderFlowTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_complete_order_flow(): void
    {
        // 1. Create order
        $createResponse = $this->postJson('/api/orders', [
            'ebook_id' => 1,
            'email' => 'test@example.com',
            'quantity' => 2
        ]);
        
        $createResponse->assertStatus(201);
        $orderId = $createResponse->json('order_id');
        
        // 2. Get order
        $getResponse = $this->getJson("/api/orders/{$orderId}");
        
        $getResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $orderId,
                    'customer_email' => 'test@example.com'
                ]
            ]);
        
        // 3. Confirm order
        $confirmResponse = $this->postJson("/api/orders/{$orderId}/confirm");
        
        $confirmResponse->assertStatus(200);
        
        // 4. Verify final state
        $this->assertDatabaseHas('orders', [
            'id' => $orderId,
            'status' => 'confirmed'
        ]);
    }
}
```

## Test Organization

```
tests/
├── Unit/
│   ├── Domain/
│   │   ├── Order/
│   │   │   ├── OrderTest.php
│   │   │   └── ValueObjects/
│   │   │       ├── EmailTest.php
│   │   │       └── MoneyTest.php
│   │   └── User/
│   └── Application/
│       └── Order/
│           └── PlaceOrderHandlerTest.php
│
├── Integration/
│   └── Infrastructure/
│       ├── Persistence/
│       │   └── SqlOrderRepositoryTest.php
│       └── External/
│           └── StripePaymentGatewayTest.php
│
├── Feature/
│   └── Infrastructure/
│       └── Web/
│           └── OrderControllerTest.php
│
├── E2E/
│   └── OrderFlowTest.php
│
└── Fakes/
    ├── InMemoryOrderRepository.php
    ├── InMemoryEbookRepository.php
    └── FakeEventBus.php
```

## Best Practices

1. **Fast unit tests**: No database, no HTTP, no file I/O
2. **Use fakes, not mocks**: Implement interfaces for testing
3. **Test behavior, not implementation**: Focus on outcomes
4. **Arrange-Act-Assert**: Clear test structure
5. **One assertion per test**: Keep tests focused
6. **Descriptive test names**: `test_throws_exception_for_invalid_email`

## Coverage Goals

- **Domain Layer**: ≥ 90%
- **Application Layer**: ≥ 85%
- **Infrastructure Layer**: ≥ 70%
- **Overall**: ≥ 80%

## Running Tests

```bash
# All tests
php artisan test

# Unit tests only
php artisan test --testsuite=Unit

# With coverage
php artisan test --coverage

# Specific test
php artisan test --filter=OrderTest
```

## Next Steps

- Review `checklists/pre-commit-checklist.md`
- Check `examples/` for complete test suites

---

**Remember**: Tests are documentation. Write tests that explain your code!
