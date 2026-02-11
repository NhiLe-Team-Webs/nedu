# Guide 04: Infrastructure Layer

## Overview

The Infrastructure Layer contains all technical implementation details: database access, HTTP handling, external APIs, file I/O, and framework-specific code. This layer implements the interfaces defined in the domain and application layers.

## Purpose

**Infrastructure Layer**:
- ✅ Implements repository interfaces
- ✅ Handles HTTP requests/responses
- ✅ Manages database connections
- ✅ Integrates with external services
- ✅ Contains framework-specific code

**Can Depend On**:
- ✅ Domain layer (to implement interfaces)
- ✅ Application layer (to call handlers)
- ✅ External libraries and frameworks

## Building Blocks

### 1. Controllers

Controllers handle HTTP requests and return responses.

```php
<?php

namespace App\Infrastructure\Web\Controllers;

use App\Application\Order\Commands\PlaceOrderCommand;
use App\Application\Order\Handlers\PlaceOrderHandler;
use App\Application\Order\Queries\GetOrderByIdQuery;
use App\Application\Order\Handlers\GetOrderByIdHandler;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

final class OrderController
{
    public function __construct(
        private PlaceOrderHandler $placeOrderHandler,
        private GetOrderByIdHandler $getOrderByIdHandler
    ) {}
    
    public function store(Request $request): JsonResponse
    {
        // 1. Validate request
        $validated = $request->validate([
            'ebook_id' => 'required|integer',
            'email' => 'required|email',
            'quantity' => 'required|integer|min:1'
        ]);
        
        // 2. Create command
        $command = new PlaceOrderCommand(
            ebookId: $validated['ebook_id'],
            customerEmail: $validated['email'],
            quantity: $validated['quantity']
        );
        
        // 3. Execute handler
        try {
            $orderId = $this->placeOrderHandler->handle($command);
            
            // 4. Return response
            return response()->json([
                'success' => true,
                'order_id' => $orderId
            ], 201);
            
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        } catch (\DomainException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 422);
        }
    }
    
    public function show(int $id): JsonResponse
    {
        $query = new GetOrderByIdQuery($id);
        
        try {
            $order = $this->getOrderByIdHandler->handle($query);
            
            return response()->json([
                'success' => true,
                'data' => $order->toArray()
            ]);
            
        } catch (OrderNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Order not found'
            ], 404);
        }
    }
}
```

**Controller Responsibilities**:
- Receive and validate HTTP requests
- Create commands/queries from request data
- Call application handlers
- Transform results to HTTP responses
- Handle exceptions and return appropriate status codes

### 2. Repository Implementations

Repositories implement domain interfaces using database access.

```php
<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use Illuminate\Support\Facades\DB;

final class SqlOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        DB::table('orders')->updateOrInsert(
            ['id' => $order->getId()->getValue()],
            [
                'customer_email' => $order->getCustomerEmail()->getValue(),
                'total_amount' => $order->getTotalAmount()->getAmount(),
                'status' => $order->getStatus()->value,
                'updated_at' => now()
            ]
        );
    }
    
    public function getById(OrderId $id): Order
    {
        $record = DB::table('orders')->find($id->getValue());
        
        if (!$record) {
            throw new OrderNotFoundException("Order not found: {$id->getValue()}");
        }
        
        return $this->mapToEntity($record);
    }
    
    public function findByCustomerEmail(Email $email): array
    {
        $records = DB::table('orders')
            ->where('customer_email', $email->getValue())
            ->get();
        
        return $records->map(fn($record) => $this->mapToEntity($record))->all();
    }
    
    public function delete(OrderId $id): void
    {
        DB::table('orders')->where('id', $id->getValue())->delete();
    }
    
    private function mapToEntity(object $record): Order
    {
        // Reconstruct domain entity from database record
        return new Order(
            new OrderId($record->id),
            new Email($record->customer_email),
            new Money($record->total_amount),
            OrderStatus::from($record->status)
        );
    }
}
```

**Using Eloquent (Alternative)**:

```php
<?php

namespace App\Infrastructure\Persistence;

use App\Infrastructure\Persistence\Models\OrderModel;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};

final class EloquentOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        OrderModel::updateOrCreate(
            ['id' => $order->getId()->getValue()],
            [
                'customer_email' => $order->getCustomerEmail()->getValue(),
                'total_amount' => $order->getTotalAmount()->getAmount(),
                'status' => $order->getStatus()->value
            ]
        );
    }
    
    public function getById(OrderId $id): Order
    {
        $model = OrderModel::findOrFail($id->getValue());
        return $this->mapToEntity($model);
    }
    
    private function mapToEntity(OrderModel $model): Order
    {
        return new Order(
            new OrderId($model->id),
            new Email($model->customer_email),
            new Money($model->total_amount),
            OrderStatus::from($model->status)
        );
    }
}
```

**Eloquent Model** (separate from domain entity):

```php
<?php

namespace App\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    protected $table = 'orders';
    
    protected $fillable = [
        'customer_email',
        'total_amount',
        'status'
    ];
    
    protected $casts = [
        'total_amount' => 'integer'
    ];
}
```

### 3. External Service Adapters

Implement application ports for external services.

```php
<?php

namespace App\Infrastructure\External;

use App\Application\Ports\EmailService;
use Illuminate\Support\Facades\Mail;
use App\Infrastructure\External\Mails\OrderConfirmationMail;

final class LaravelEmailService implements EmailService
{
    public function sendOrderConfirmation(string $email, int $orderId): void
    {
        Mail::to($email)->send(new OrderConfirmationMail($orderId));
    }
    
    public function sendPasswordReset(string $email, string $token): void
    {
        Mail::to($email)->send(new PasswordResetMail($token));
    }
}
```

```php
<?php

namespace App\Infrastructure\External;

use App\Application\Ports\PaymentGateway;
use App\Domain\Order\ValueObjects\Money;
use Stripe\StripeClient;

final class StripePaymentGateway implements PaymentGateway
{
    private StripeClient $stripe;
    
    public function __construct(string $apiKey)
    {
        $this->stripe = new StripeClient($apiKey);
    }
    
    public function charge(string $paymentMethod, Money $amount): PaymentResult
    {
        $charge = $this->stripe->charges->create([
            'amount' => $amount->getAmount(),
            'currency' => strtolower($amount->getCurrency()),
            'source' => $paymentMethod
        ]);
        
        return new PaymentResult(
            $charge->id,
            $charge->status === 'succeeded'
        );
    }
}
```

### 4. Event Bus Implementation

```php
<?php

namespace App\Infrastructure\Messaging;

use App\Application\Ports\EventBus;
use Illuminate\Support\Facades\Event;

final class LaravelEventBus implements EventBus
{
    public function publish(object $event): void
    {
        Event::dispatch($event);
    }
}
```

### 5. Dependency Injection Configuration

```php
<?php

namespace App\Infrastructure\Config;

use Illuminate\Support\ServiceProvider;
use App\Domain\Order\Repositories\OrderRepository;
use App\Infrastructure\Persistence\SqlOrderRepository;
use App\Application\Ports\{EmailService, EventBus, PaymentGateway};
use App\Infrastructure\External\{LaravelEmailService, StripePaymentGateway};
use App\Infrastructure\Messaging\LaravelEventBus;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind repositories
        $this->app->bind(OrderRepository::class, SqlOrderRepository::class);
        
        // Bind application ports
        $this->app->bind(EmailService::class, LaravelEmailService::class);
        $this->app->bind(EventBus::class, LaravelEventBus::class);
        
        $this->app->bind(PaymentGateway::class, function ($app) {
            return new StripePaymentGateway(config('services.stripe.secret'));
        });
        
        // Bind handlers as singletons
        $this->app->singleton(PlaceOrderHandler::class);
        $this->app->singleton(GetOrderByIdHandler::class);
    }
}
```

### 6. Routes Configuration

```php
<?php

// routes/api.php
use App\Infrastructure\Web\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
```

## Testing Infrastructure Layer

### Integration Tests

```php
<?php

namespace Tests\Integration\Infrastructure;

use Tests\TestCase;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email, Money};
use App\Infrastructure\Persistence\SqlOrderRepository;
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
    }
    
    public function test_throws_exception_when_order_not_found(): void
    {
        $this->expectException(OrderNotFoundException::class);
        $this->repository->getById(new OrderId(999));
    }
}
```

### Controller Tests

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
            ->assertJson([
                'success' => true
            ])
            ->assertJsonStructure([
                'order_id'
            ]);
        
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
}
```

## Best Practices

1. **Keep controllers thin**: Only HTTP concerns
2. **Map between layers**: DB models ↔ Domain entities
3. **Use interfaces**: Depend on abstractions, not concretions
4. **Separate concerns**: One adapter per external service
5. **Handle errors properly**: Return appropriate HTTP status codes
6. **Test with real dependencies**: Integration tests use actual DB

## Common Mistakes

❌ **Business Logic in Controller**:
```php
public function store(Request $request) {
    $total = $request->quantity * $request->price; // Business logic!
    DB::table('orders')->insert(['total' => $total]);
}
```

✅ **Delegate to Handler**:
```php
public function store(Request $request) {
    $command = new PlaceOrderCommand(...);
    $orderId = $this->handler->handle($command);
    return response()->json(['order_id' => $orderId]);
}
```

❌ **Exposing ORM Models**:
```php
public function getById(int $id): OrderModel {
    return OrderModel::find($id); // Exposes Eloquent model!
}
```

✅ **Return Domain Entities**:
```php
public function getById(OrderId $id): Order {
    $model = OrderModel::find($id->getValue());
    return $this->mapToEntity($model); // Return domain entity
}
```

## Next Steps

- Read `05-repository-pattern.md` for advanced repository techniques
- Read `06-dependency-injection.md` for DI best practices
- Check `templates/infrastructure/` for code templates

---

**Remember**: Infrastructure is replaceable. Keep it decoupled from your core business logic!
