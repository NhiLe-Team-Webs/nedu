# Guide 06: Dependency Injection

## Overview

Dependency Injection (DI) is crucial for Clean Architecture. It allows you to inject implementations at runtime, keeping your code flexible and testable.

## Core Principles

**Dependency Injection**:
- ✅ Inject via constructor
- ✅ Depend on interfaces, not concrete classes
- ✅ Use framework's DI container
- ❌ No service locator pattern
- ❌ No static method calls
- ❌ No global state

## Setup DI Container

### Laravel Service Provider

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Order\Repositories\OrderRepository;
use App\Infrastructure\Persistence\SqlOrderRepository;
use App\Application\Ports\{EmailService, EventBus};
use App\Infrastructure\External\LaravelEmailService;
use App\Infrastructure\Messaging\LaravelEventBus;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Repositories
        $this->app->bind(OrderRepository::class, SqlOrderRepository::class);
        $this->app->bind(UserRepository::class, SqlUserRepository::class);
        
        // Application Ports
        $this->app->bind(EmailService::class, LaravelEmailService::class);
        $this->app->bind(EventBus::class, LaravelEventBus::class);
        
        // Handlers (Singletons)
        $this->app->singleton(PlaceOrderHandler::class);
        $this->app->singleton(GetOrderByIdHandler::class);
    }
}
```

### Node.js/TypeScript (InversifyJS)

```typescript
// src/infrastructure/config/container.ts
import { Container } from 'inversify';
import { OrderRepository } from '@domain/order/repositories/OrderRepository';
import { SqlOrderRepository } from '@infrastructure/persistence/SqlOrderRepository';
import { PlaceOrderHandler } from '@application/order/handlers/PlaceOrderHandler';

const container = new Container();

// Repositories
container.bind<OrderRepository>('OrderRepository').to(SqlOrderRepository);

// Handlers
container.bind<PlaceOrderHandler>('PlaceOrderHandler').to(PlaceOrderHandler);

export { container };
```

### Spring Boot (Java)

```java
@Configuration
public class ApplicationConfig {
    
    @Bean
    public OrderRepository orderRepository(DataSource dataSource) {
        return new JdbcOrderRepository(dataSource);
    }
    
    @Bean
    public PlaceOrderHandler placeOrderHandler(
        OrderRepository orderRepo,
        EbookRepository ebookRepo
    ) {
        return new PlaceOrderHandler(orderRepo, ebookRepo);
    }
}
```

## Constructor Injection

### Handler with Dependencies

```php
<?php

namespace App\Application\Order\Handlers;

use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Ebook\Repositories\EbookRepository;
use App\Application\Ports\EventBus;

final class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepository,
        private EbookRepository $ebookRepository,
        private EventBus $eventBus
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        $ebook = $this->ebookRepository->getById($command->ebookId);
        $order = Order::createFromEbook(...);
        $this->orderRepository->save($order);
        $this->eventBus->publish(new OrderPlaced($order));
        return $order->getId()->getValue();
    }
}
```

### Controller with Handler

```php
<?php

namespace App\Infrastructure\Web\Controllers;

use App\Application\Order\Handlers\PlaceOrderHandler;

final class OrderController
{
    public function __construct(
        private PlaceOrderHandler $handler
    ) {}
    
    public function store(Request $request): JsonResponse
    {
        $command = new PlaceOrderCommand(...);
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId]);
    }
}
```

## Testing with DI

### Manual Injection in Tests

```php
<?php

namespace Tests\Unit\Application;

use PHPUnit\Framework\TestCase;
use Tests\Fakes\{InMemoryOrderRepository, InMemoryEbookRepository};

class PlaceOrderHandlerTest extends TestCase
{
    public function test_places_order(): void
    {
        // Manually inject fake repositories
        $orderRepo = new InMemoryOrderRepository();
        $ebookRepo = new InMemoryEbookRepository();
        $eventBus = new FakeEventBus();
        
        $handler = new PlaceOrderHandler($orderRepo, $ebookRepo, $eventBus);
        
        $command = new PlaceOrderCommand(1, 'test@example.com', 2);
        $orderId = $handler->handle($command);
        
        $this->assertNotNull($orderId);
    }
}
```

### Using Container in Tests

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Domain\Order\Repositories\OrderRepository;
use Tests\Fakes\InMemoryOrderRepository;

class OrderFeatureTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        
        // Swap real repository with fake
        $this->app->bind(OrderRepository::class, InMemoryOrderRepository::class);
    }
    
    public function test_creates_order(): void
    {
        $response = $this->postJson('/api/orders', [...]);
        $response->assertStatus(201);
    }
}
```

## Best Practices

1. **Always inject via constructor**
2. **Type-hint interfaces, not concrete classes**
3. **Keep constructors simple** (no logic)
4. **Use singletons for stateless services**
5. **Provide fake implementations for testing**

## Common Mistakes

❌ **Service Locator**:
```php
class Handler {
    public function handle() {
        $repo = app('OrderRepository'); // Anti-pattern!
    }
}
```

✅ **Constructor Injection**:
```php
class Handler {
    public function __construct(private OrderRepository $repo) {}
    
    public function handle() {
        $this->repo->save(...);
    }
}
```

❌ **Depending on Concrete Class**:
```php
public function __construct(private SqlOrderRepository $repo) {} // Concrete!
```

✅ **Depending on Interface**:
```php
public function __construct(private OrderRepository $repo) {} // Interface!
```

## Next Steps

- Read `07-testing-strategy.md`
- Check `templates/infrastructure/di-container-template.txt`

---

**Remember**: Inject dependencies, don't create them!
