# Refactoring: Legacy to Clean Architecture

## Overview

This guide helps you refactor existing legacy code to Clean Architecture. The process is incremental and safe, allowing you to migrate gradually without breaking existing functionality.

## Migration Strategy

### Approach: Strangler Fig Pattern

Instead of rewriting everything, gradually replace old code with new clean architecture code.

```
Legacy Code → Hybrid (Legacy + Clean) → Clean Architecture
```

**Benefits**:
- ✅ No big bang rewrite
- ✅ Continuous delivery
- ✅ Lower risk
- ✅ Incremental improvements

## Step-by-Step Migration

### Phase 1: Prepare Foundation

#### 1.1 Create Directory Structure

```bash
src/
├── domain/
│   └── .gitkeep
├── application/
│   └── .gitkeep
└── infrastructure/
    └── .gitkeep
```

#### 1.2 Setup Autoloading

**composer.json** (PHP):
```json
{
    "autoload": {
        "psr-4": {
            "App\\Domain\\": "src/domain/",
            "App\\Application\\": "src/application/",
            "App\\Infrastructure\\": "src/infrastructure/"
        }
    }
}
```

Run: `composer dump-autoload`

#### 1.3 Create Base Interfaces

```php
// src/domain/shared/repositories/Repository.php
namespace App\Domain\Shared\Repositories;

interface Repository {}
```

### Phase 2: Extract Domain Entities

#### Before (Legacy - Anemic Model)

```php
// app/Models/Order.php
class Order extends Model
{
    protected $fillable = ['user_id', 'total', 'status'];
    
    // No business logic, just data
}

// app/Http/Controllers/OrderController.php
class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Business logic in controller
        $total = $request->quantity * $request->price;
        
        if ($request->quantity >= 10) {
            $total *= 0.9; // 10% discount
        }
        
        Order::create([
            'user_id' => $request->user_id,
            'total' => $total,
            'status' => 'pending'
        ]);
    }
}
```

#### After (Clean Architecture)

**Step 1: Create Value Objects**

```php
// src/domain/order/value-objects/Money.php
namespace App\Domain\Order\ValueObjects;

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
    
    public function multiply(float $multiplier): self
    {
        return new self((int)($this->amount * $multiplier));
    }
}
```

**Step 2: Create Domain Entity**

```php
// src/domain/order/entities/Order.php
namespace App\Domain\Order\Entities;

use App\Domain\Order\ValueObjects\{OrderId, Money};

class Order
{
    private OrderId $id;
    private int $userId;
    private Money $total;
    private string $status;
    
    public function __construct(
        OrderId $id,
        int $userId,
        Money $total
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->total = $total;
        $this->status = 'pending';
    }
    
    public function applyBulkDiscount(int $quantity): void
    {
        if ($quantity >= 10) {
            $this->total = $this->total->multiply(0.9);
        }
    }
    
    // Getters...
}
```

**Step 3: Create Repository Interface**

```php
// src/domain/order/repositories/OrderRepository.php
namespace App\Domain\Order\Repositories;

use App\Domain\Order\Entities\Order;

interface OrderRepository
{
    public function save(Order $order): void;
    public function getById(int $id): Order;
}
```

**Step 4: Create Repository Implementation**

```php
// src/infrastructure/persistence/EloquentOrderRepository.php
namespace App\Infrastructure\Persistence;

use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\Entities\Order;
use App\Models\Order as OrderModel; // Legacy Eloquent model

final class EloquentOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        OrderModel::updateOrCreate(
            ['id' => $order->getId()->getValue()],
            [
                'user_id' => $order->getUserId(),
                'total' => $order->getTotal()->getAmount(),
                'status' => $order->getStatus()
            ]
        );
    }
    
    public function getById(int $id): Order
    {
        $model = OrderModel::findOrFail($id);
        
        return new Order(
            new OrderId($model->id),
            $model->user_id,
            new Money($model->total)
        );
    }
}
```

**Step 5: Create Application Handler**

```php
// src/application/order/handlers/PlaceOrderHandler.php
namespace App\Application\Order\Handlers;

use App\Application\Order\Commands\PlaceOrderCommand;
use App\Domain\Order\Repositories\OrderRepository;
use App\Domain\Order\Entities\Order;

final class PlaceOrderHandler
{
    public function __construct(
        private OrderRepository $orderRepository
    ) {}
    
    public function handle(PlaceOrderCommand $command): int
    {
        $order = new Order(
            OrderId::generate(),
            $command->userId,
            new Money($command->quantity * $command->price)
        );
        
        $order->applyBulkDiscount($command->quantity);
        
        $this->orderRepository->save($order);
        
        return $order->getId()->getValue();
    }
}
```

**Step 6: Update Controller**

```php
// app/Http/Controllers/OrderController.php
class OrderController extends Controller
{
    public function __construct(
        private PlaceOrderHandler $handler
    ) {}
    
    public function store(Request $request)
    {
        $command = new PlaceOrderCommand(
            userId: $request->user_id,
            quantity: $request->quantity,
            price: $request->price
        );
        
        $orderId = $this->handler->handle($command);
        
        return response()->json(['order_id' => $orderId], 201);
    }
}
```

**Step 7: Configure DI**

```php
// app/Providers/AppServiceProvider.php
use App\Domain\Order\Repositories\OrderRepository;
use App\Infrastructure\Persistence\EloquentOrderRepository;

public function register(): void
{
    $this->app->bind(OrderRepository::class, EloquentOrderRepository::class);
}
```

### Phase 3: Migrate Incrementally

#### Strategy: Feature by Feature

1. **Identify a feature** (e.g., "Place Order")
2. **Extract domain logic** to entities
3. **Create repository interface** in domain
4. **Implement repository** in infrastructure
5. **Create application handler**
6. **Update controller** to use handler
7. **Write tests**
8. **Deploy**
9. **Repeat** for next feature

#### Coexistence Pattern

Old and new code can coexist:

```php
class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Use feature flag to switch between old and new
        if (config('features.clean_architecture_orders')) {
            return $this->storeWithCleanArchitecture($request);
        }
        
        return $this->storeLegacy($request);
    }
    
    private function storeWithCleanArchitecture(Request $request)
    {
        $command = new PlaceOrderCommand(...);
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId]);
    }
    
    private function storeLegacy(Request $request)
    {
        // Old code stays here until fully migrated
        Order::create([...]);
    }
}
```

### Phase 4: Remove Legacy Code

Once new code is stable:

1. **Remove feature flags**
2. **Delete old code**
3. **Remove unused dependencies**
4. **Update documentation**

## Common Migration Patterns

### Pattern 1: Fat Controller → Thin Controller + Handler

**Before**:
```php
class UserController {
    public function register(Request $request) {
        // 50 lines of business logic
        $user = new User();
        $user->email = $request->email;
        // Validation, hashing, saving, emailing...
    }
}
```

**After**:
```php
// Controller
class UserController {
    public function register(Request $request) {
        $command = new RegisterUserCommand($request->email, $request->password);
        $userId = $this->handler->handle($command);
        return response()->json(['user_id' => $userId]);
    }
}

// Handler
class RegisterUserHandler {
    public function handle(RegisterUserCommand $command): int {
        $user = User::register(new Email($command->email), ...);
        $this->userRepo->save($user);
        $this->emailService->sendWelcome($user->getEmail());
        return $user->getId()->getValue();
    }
}
```

### Pattern 2: Eloquent Model → Domain Entity + Eloquent Adapter

**Before**:
```php
class Product extends Model {
    public function calculatePrice() {
        return $this->base_price * (1 + $this->tax_rate);
    }
}
```

**After**:
```php
// Domain Entity
class Product {
    public function calculatePrice(): Money {
        $tax = $this->basePrice->multiply($this->taxRate);
        return $this->basePrice->add($tax);
    }
}

// Infrastructure (keep Eloquent for persistence only)
class ProductModel extends Model {
    // Just for database mapping
}

// Repository maps between them
class EloquentProductRepository implements ProductRepository {
    public function save(Product $product): void {
        ProductModel::updateOrCreate([...]);
    }
}
```

### Pattern 3: Service Class → Domain Service + Application Service

**Before**:
```php
class OrderService {
    public function placeOrder($data) {
        // Mix of business logic and infrastructure
        $order = Order::create($data);
        DB::transaction(function() use ($order) {
            $order->save();
            Mail::send(...);
        });
    }
}
```

**After**:
```php
// Domain Service (if needed)
class OrderPricingService {
    public function calculateTotal(array $items): Money { }
}

// Application Handler
class PlaceOrderHandler {
    public function handle(PlaceOrderCommand $command): int {
        $order = Order::create(...);
        $this->orderRepo->save($order);
        $this->emailService->sendConfirmation(...);
        return $order->getId()->getValue();
    }
}
```

## Testing During Migration

### Test Old and New Side by Side

```php
class OrderMigrationTest extends TestCase
{
    public function test_old_and_new_produce_same_result()
    {
        $request = ['user_id' => 1, 'quantity' => 5, 'price' => 1000];
        
        // Old way
        $oldOrder = $this->createOrderLegacy($request);
        
        // New way
        $command = new PlaceOrderCommand(...);
        $newOrderId = $this->handler->handle($command);
        $newOrder = $this->orderRepo->getById($newOrderId);
        
        // Compare results
        $this->assertEquals($oldOrder->total, $newOrder->getTotal()->getAmount());
        $this->assertEquals($oldOrder->status, $newOrder->getStatus());
    }
}
```

## Migration Checklist

### For Each Feature:
- [ ] Extract business logic to domain entities
- [ ] Create value objects for primitives
- [ ] Define repository interface in domain
- [ ] Implement repository in infrastructure
- [ ] Create application command/query
- [ ] Create application handler
- [ ] Update controller to use handler
- [ ] Configure dependency injection
- [ ] Write unit tests for domain
- [ ] Write integration tests for repository
- [ ] Write feature tests for controller
- [ ] Deploy with feature flag
- [ ] Monitor in production
- [ ] Remove feature flag
- [ ] Delete old code

## Common Pitfalls

### ❌ Pitfall 1: Big Bang Rewrite

Don't try to rewrite everything at once. Migrate incrementally.

### ❌ Pitfall 2: Leaking Eloquent Models

Don't return Eloquent models from repositories. Map to domain entities.

### ❌ Pitfall 3: Skipping Tests

Always write tests during migration to ensure correctness.

### ❌ Pitfall 4: Ignoring Performance

Monitor performance during migration. Clean architecture shouldn't be slower.

## Timeline Example

**Week 1-2**: Setup foundation, create directory structure
**Week 3-4**: Migrate first feature (e.g., User Registration)
**Week 5-6**: Migrate second feature (e.g., Order Placement)
**Week 7-8**: Migrate third feature
**Week 9-10**: Remove legacy code, cleanup

## Success Metrics

- [ ] All new features use Clean Architecture
- [ ] Test coverage ≥ 80%
- [ ] No business logic in controllers
- [ ] No database access in domain/application
- [ ] All dependencies injected via constructor
- [ ] Legacy code removed

---

**Remember**: Migration is a journey, not a destination. Take it one step at a time!
