# Guide 05: Repository Pattern

## Overview

The Repository Pattern abstracts data access logic and provides a collection-like interface for accessing domain entities. This guide covers advanced repository techniques and best practices.

## Core Concepts

### Repository Interface (Domain Layer)

```php
<?php

namespace App\Domain\Order\Repositories;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\{OrderId, Email};

interface OrderRepository
{
    public function save(Order $order): void;
    public function getById(OrderId $id): Order;
    public function findByCustomerEmail(Email $email): array;
    public function delete(OrderId $id): void;
    public function nextId(): OrderId;
}
```

### Repository Implementation (Infrastructure Layer)

```php
<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use Illuminate\Support\Facades\DB;

final class SqlOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        DB::table('orders')->updateOrInsert(
            ['id' => $order->getId()->getValue()],
            $this->mapToDatabase($order)
        );
    }
    
    public function getById(OrderId $id): Order
    {
        $record = DB::table('orders')->find($id->getValue());
        
        if (!$record) {
            throw new OrderNotFoundException();
        }
        
        return $this->mapToEntity($record);
    }
    
    public function findByCustomerEmail(Email $email): array
    {
        return DB::table('orders')
            ->where('customer_email', $email->getValue())
            ->get()
            ->map(fn($r) => $this->mapToEntity($r))
            ->all();
    }
    
    public function delete(OrderId $id): void
    {
        DB::table('orders')->where('id', $id->getValue())->delete();
    }
    
    public function nextId(): OrderId
    {
        return new OrderId(DB::table('orders')->max('id') + 1);
    }
    
    private function mapToEntity(object $record): Order
    {
        return new Order(
            new OrderId($record->id),
            new Email($record->customer_email),
            new Money($record->total_amount)
        );
    }
    
    private function mapToDatabase(Order $order): array
    {
        return [
            'customer_email' => $order->getCustomerEmail()->getValue(),
            'total_amount' => $order->getTotalAmount()->getAmount(),
            'status' => $order->getStatus()->value,
            'updated_at' => now()
        ];
    }
}
```

## Advanced Patterns

### 1. Specification Pattern

```php
<?php

namespace App\Domain\Order\Specifications;

interface OrderSpecification
{
    public function isSatisfiedBy(Order $order): bool;
    public function toSql(): string; // For database queries
}

class HighValueOrderSpec implements OrderSpecification
{
    public function __construct(private Money $threshold) {}
    
    public function isSatisfiedBy(Order $order): bool
    {
        return $order->getTotalAmount()->getAmount() >= $this->threshold->getAmount();
    }
    
    public function toSql(): string
    {
        return "total_amount >= {$this->threshold->getAmount()}";
    }
}

// Usage in repository
public function findBySpecification(OrderSpecification $spec): array
{
    return DB::table('orders')
        ->whereRaw($spec->toSql())
        ->get()
        ->map(fn($r) => $this->mapToEntity($r))
        ->all();
}
```

### 2. Query Object Pattern

```php
<?php

namespace App\Infrastructure\Persistence\Queries;

class OrderQuery
{
    private array $criteria = [];
    
    public function withStatus(string $status): self
    {
        $this->criteria['status'] = $status;
        return $this;
    }
    
    public function withMinAmount(int $amount): self
    {
        $this->criteria['min_amount'] = $amount;
        return $this;
    }
    
    public function execute(): array
    {
        $query = DB::table('orders');
        
        if (isset($this->criteria['status'])) {
            $query->where('status', $this->criteria['status']);
        }
        
        if (isset($this->criteria['min_amount'])) {
            $query->where('total_amount', '>=', $this->criteria['min_amount']);
        }
        
        return $query->get()->map(fn($r) => $this->mapToEntity($r))->all();
    }
}

// Usage
$orders = (new OrderQuery())
    ->withStatus('pending')
    ->withMinAmount(10000)
    ->execute();
```

### 3. Unit of Work Pattern

```php
<?php

namespace App\Infrastructure\Persistence;

class UnitOfWork
{
    private array $newEntities = [];
    private array $dirtyEntities = [];
    private array $removedEntities = [];
    
    public function registerNew(object $entity): void
    {
        $this->newEntities[] = $entity;
    }
    
    public function registerDirty(object $entity): void
    {
        $this->dirtyEntities[] = $entity;
    }
    
    public function registerRemoved(object $entity): void
    {
        $this->removedEntities[] = $entity;
    }
    
    public function commit(): void
    {
        DB::transaction(function () {
            foreach ($this->newEntities as $entity) {
                $this->insert($entity);
            }
            
            foreach ($this->dirtyEntities as $entity) {
                $this->update($entity);
            }
            
            foreach ($this->removedEntities as $entity) {
                $this->delete($entity);
            }
            
            $this->clear();
        });
    }
    
    private function clear(): void
    {
        $this->newEntities = [];
        $this->dirtyEntities = [];
        $this->removedEntities = [];
    }
}
```

## Testing Repositories

### In-Memory Repository for Tests

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
    
    public function findByCustomerEmail(Email $email): array
    {
        return array_filter(
            $this->orders,
            fn($order) => $order->getCustomerEmail()->equals($email)
        );
    }
    
    public function delete(OrderId $id): void
    {
        unset($this->orders[$id->getValue()]);
    }
    
    public function nextId(): OrderId
    {
        return new OrderId($this->nextId++);
    }
    
    public function clear(): void
    {
        $this->orders = [];
        $this->nextId = 1;
    }
}
```

## Best Practices

1. **Interface in domain, implementation in infrastructure**
2. **Return domain entities, not database models**
3. **Keep repository methods focused on data access**
4. **Use specifications for complex queries**
5. **Provide in-memory implementations for testing**
6. **Handle not-found cases with exceptions**

## Common Mistakes

❌ **Business Logic in Repository**
❌ **Returning arrays instead of entities**
❌ **Exposing database details in interface**
✅ **Clean interface, focused responsibility**

## Next Steps

- Read `06-dependency-injection.md`
- Read `07-testing-strategy.md`
- Check `templates/domain/repository-interface-template.txt`

---

**Remember**: Repositories are collections of entities, not database wrappers!
