# Decision Tree: Repository vs Service

## Question Flow

```
Where should this logic go?
│
├─ Is it about data access/persistence?
│   │
│   ├─ YES → **REPOSITORY**
│   │   Examples: save, getById, findBy, delete
│   │
│   └─ NO → Continue...
│
├─ Is it business logic involving one entity?
│   │
│   ├─ YES → **ENTITY METHOD**
│   │   Examples: calculateTotal, applyDiscount, confirm
│   │
│   └─ NO → Continue...
│
├─ Is it business logic involving multiple entities?
│   │
│   ├─ YES → **DOMAIN SERVICE**
│   │   Examples: transferMoney, calculateShipping
│   │
│   └─ NO → Continue...
│
└─ Is it orchestrating a use case?
    │
    ├─ YES → **APPLICATION SERVICE/HANDLER**
    │   Examples: PlaceOrderHandler, RegisterUserHandler
    │
    └─ NO → **RECONSIDER** your design
```

## Quick Reference

| Concern | Location | Example |
|---------|----------|---------|
| Data access | Repository | `save()`, `getById()` |
| Single entity logic | Entity | `calculateTotal()` |
| Multi-entity logic | Domain Service | `transferMoney()` |
| Use case orchestration | Application Service | `PlaceOrderHandler` |
| External integration | Infrastructure Adapter | `StripePaymentGateway` |

## Repository

**Use when**: You need to access/persist data

**Characteristics**:
- ✅ Data access only
- ✅ No business logic
- ✅ Returns domain entities
- ❌ No calculations or validations

**Examples**:

```php
interface OrderRepository {
    public function save(Order $order): void;
    public function getById(OrderId $id): Order;
    public function findByCustomer(CustomerId $id): array;
    public function delete(OrderId $id): void;
}
```

**✅ Good Repository**:
```php
public function save(Order $order): void {
    DB::table('orders')->updateOrInsert(
        ['id' => $order->getId()->getValue()],
        ['total' => $order->getTotal()->getAmount()]
    );
}
```

**❌ Bad Repository** (has business logic):
```php
public function save(Order $order): void {
    // Calculate discount - WRONG! This is business logic
    if ($order->getTotal() > 10000) {
        $order->applyDiscount(10);
    }
    
    DB::table('orders')->insert([...]);
}
```

## Domain Service

**Use when**: Business logic spans multiple entities or doesn't belong to one entity

**Characteristics**:
- ✅ Business logic
- ✅ Stateless
- ✅ Works with domain entities
- ❌ No data access (uses repositories)

**Examples**:

```php
final class MoneyTransferService {
    public function transfer(
        Account $from,
        Account $to,
        Money $amount
    ): void {
        // Business logic involving two entities
        if (!$from->canWithdraw($amount)) {
            throw new InsufficientFundsException();
        }
        
        $from->withdraw($amount);
        $to->deposit($amount);
    }
}
```

```php
final class OrderPricingService {
    public function calculateShipping(
        Order $order,
        Address $address
    ): Money {
        // Complex pricing logic
        $baseRate = new Money(500);
        $distance = $this->calculateDistance($order->getWarehouse(), $address);
        $weight = $order->getTotalWeight();
        
        return $baseRate->add(
            $this->calculateDistanceFee($distance)
        )->add(
            $this->calculateWeightFee($weight)
        );
    }
}
```

**✅ Good Domain Service**:
- Stateless
- Pure business logic
- No infrastructure dependencies

**❌ Bad Domain Service** (has infrastructure):
```php
class OrderService {
    public function placeOrder(Order $order): void {
        // Saving to DB - WRONG! Use repository
        DB::table('orders')->insert([...]);
        
        // Sending email - WRONG! Use application service
        Mail::to($order->getEmail())->send(...);
    }
}
```

## Application Service/Handler

**Use when**: Orchestrating a complete use case

**Characteristics**:
- ✅ Orchestrates domain logic
- ✅ Uses repositories
- ✅ Coordinates transactions
- ✅ Publishes events
- ❌ No business logic (delegates to domain)

**Examples**:

```php
final class PlaceOrderHandler {
    public function __construct(
        private OrderRepository $orderRepo,
        private ProductRepository $productRepo,
        private EventBus $eventBus
    ) {}
    
    public function handle(PlaceOrderCommand $command): int {
        // 1. Fetch data
        $product = $this->productRepo->getById($command->productId);
        
        // 2. Create domain entity (business logic in entity)
        $order = Order::create(
            OrderId::generate(),
            new Email($command->email),
            $product,
            $command->quantity
        );
        
        // 3. Save
        $this->orderRepo->save($order);
        
        // 4. Publish event
        $this->eventBus->publish(new OrderPlaced($order));
        
        return $order->getId()->getValue();
    }
}
```

**✅ Good Application Service**:
- Orchestrates
- Delegates business logic to domain
- Uses repositories for data access

**❌ Bad Application Service** (has business logic):
```php
class PlaceOrderHandler {
    public function handle($command) {
        // Calculating total - WRONG! This is business logic
        $total = $command->quantity * $command->price;
        
        // Should be in domain entity
        if ($total > 10000) {
            $total *= 0.9; // Discount
        }
        
        $this->orderRepo->save([...]);
    }
}
```

## Common Scenarios

### Scenario 1: Calculating Order Total

**Question**: Where should `calculateTotal()` go?

**Answer**: **Entity Method**

**Reasoning**: Logic belongs to single entity (Order)

```php
class Order {
    public function calculateTotal(): Money {
        return $this->items->reduce(
            fn($total, $item) => $total->add($item->getSubtotal()),
            new Money(0)
        );
    }
}
```

### Scenario 2: Finding Orders by Status

**Question**: Where should `findByStatus()` go?

**Answer**: **Repository**

**Reasoning**: Data access operation

```php
interface OrderRepository {
    public function findByStatus(OrderStatus $status): array;
}
```

### Scenario 3: Transferring Money Between Accounts

**Question**: Where should money transfer logic go?

**Answer**: **Domain Service**

**Reasoning**: Involves two entities (two accounts)

```php
final class MoneyTransferService {
    public function transfer(Account $from, Account $to, Money $amount): void {
        $from->withdraw($amount);
        $to->deposit($amount);
    }
}
```

### Scenario 4: Registering a New User

**Question**: Where should user registration flow go?

**Answer**: **Application Service/Handler**

**Reasoning**: Orchestrates multiple steps (create user, send email, log event)

```php
final class RegisterUserHandler {
    public function handle(RegisterUserCommand $command): int {
        $user = User::register(...);
        $this->userRepo->save($user);
        $this->emailService->sendWelcome($user->getEmail());
        $this->eventBus->publish(new UserRegistered($user));
        return $user->getId()->getValue();
    }
}
```

## Decision Checklist

### Use Repository if:
- [ ] Saving/loading entities
- [ ] Querying database
- [ ] Deleting entities
- [ ] No business logic involved

### Use Entity Method if:
- [ ] Logic belongs to one entity
- [ ] Modifying entity state
- [ ] Calculating entity properties
- [ ] Validating entity rules

### Use Domain Service if:
- [ ] Logic spans multiple entities
- [ ] Stateless operation
- [ ] Pure business logic
- [ ] No infrastructure dependencies

### Use Application Service if:
- [ ] Orchestrating use case
- [ ] Coordinating multiple operations
- [ ] Managing transactions
- [ ] Publishing events

## Common Mistakes

### ❌ Mistake 1: Business Logic in Repository

```php
// Wrong
class OrderRepository {
    public function save(Order $order) {
        if ($order->getTotal() > 1000) {
            $order->applyDiscount(10); // Business logic!
        }
        DB::insert([...]);
    }
}
```

**Fix**: Move to entity or domain service

### ❌ Mistake 2: Data Access in Domain Service

```php
// Wrong
class OrderService {
    public function calculateTotal(int $orderId): Money {
        $order = DB::table('orders')->find($orderId); // Data access!
        return $order->total;
    }
}
```

**Fix**: Use repository

### ❌ Mistake 3: Business Logic in Application Service

```php
// Wrong
class PlaceOrderHandler {
    public function handle($command) {
        $total = $command->quantity * $command->price; // Business logic!
        $this->orderRepo->save([...]);
    }
}
```

**Fix**: Move to entity

## Summary

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Repository** | Data access | `save()`, `findById()` |
| **Entity** | Single-entity logic | `calculateTotal()` |
| **Domain Service** | Multi-entity logic | `transferMoney()` |
| **Application Service** | Use case orchestration | `PlaceOrderHandler` |

---

**Remember**: Keep business logic in domain, data access in repositories, orchestration in application services!
