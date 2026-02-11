# Guide 02: Domain Layer

## Overview

The Domain Layer is the heart of your application. It contains pure business logic, free from any technical concerns. This guide teaches you how to design and implement domain entities, value objects, and domain services.

## Core Principles

**Domain Layer Must**:
- ✅ Contain only business logic
- ✅ Be framework-agnostic
- ✅ Validate its own data
- ✅ Be testable without external dependencies

**Domain Layer Must NOT**:
- ❌ Import framework code
- ❌ Access databases
- ❌ Make HTTP calls
- ❌ Perform file I/O

## Building Blocks

### 1. Entities

**Definition**: Objects with unique identity that persist over time.

**Characteristics**:
- Has a unique identifier (ID)
- Identity matters more than attributes
- Can change state over time
- Encapsulates business logic

**Example: Order Entity**

```php
<?php

namespace App\Domain\Order\Entities;

use App\Domain\Order\ValueObjects\OrderId;
use App\Domain\Order\ValueObjects\Email;
use App\Domain\Order\ValueObjects\Money;

final class Order
{
    private OrderId $id;
    private Email $customerEmail;
    private Money $totalAmount;
    private OrderStatus $status;
    private \DateTimeImmutable $createdAt;
    
    public function __construct(
        OrderId $id,
        Email $customerEmail,
        Money $totalAmount
    ) {
        $this->id = $id;
        $this->customerEmail = $customerEmail;
        $this->totalAmount = $totalAmount;
        $this->status = OrderStatus::PENDING;
        $this->createdAt = new \DateTimeImmutable();
    }
    
    public function getId(): OrderId
    {
        return $this->id;
    }
    
    public function getCustomerEmail(): Email
    {
        return $this->customerEmail;
    }
    
    public function getTotalAmount(): Money
    {
        return $this->totalAmount;
    }
    
    public function getStatus(): OrderStatus
    {
        return $this->status;
    }
    
    // Business logic methods
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
        
        $this->status = OrderStatus::CANCELLED;
    }
    
    public function applyDiscount(int $percentage): void
    {
        if ($percentage < 0 || $percentage > 100) {
            throw new \InvalidArgumentException('Invalid discount percentage');
        }
        
        $discountAmount = $this->totalAmount->multiply($percentage / 100);
        $this->totalAmount = $this->totalAmount->subtract($discountAmount);
    }
}
```

**Key Points**:
- Constructor validates all data
- Properties are private
- Only getters exposed (immutability)
- Business methods modify state with validation

### 2. Value Objects

**Definition**: Immutable objects defined by their attributes, not identity.

**Characteristics**:
- No unique identifier
- Immutable (cannot change after creation)
- Equality based on values
- Self-validating

**Example: Email Value Object**

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
        
        $this->value = strtolower($value);
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

**Example: Money Value Object**

```php
<?php

namespace App\Domain\Order\ValueObjects;

final class Money
{
    private int $amount; // Store in cents to avoid float issues
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
        return new Money($this->amount - $other->amount, $this->currency);
    }
    
    public function multiply(float $multiplier): Money
    {
        return new Money((int)($this->amount * $multiplier), $this->currency);
    }
    
    public function equals(Money $other): bool
    {
        return $this->amount === $other->amount 
            && $this->currency === $other->currency;
    }
    
    private function assertSameCurrency(Money $other): void
    {
        if ($this->currency !== $other->currency) {
            throw new \InvalidArgumentException('Cannot operate on different currencies');
        }
    }
}
```

### 3. Repository Interfaces

**Definition**: Contracts for data access, defined in domain but implemented in infrastructure.

**Example: OrderRepository Interface**

```php
<?php

namespace App\Domain\Order\Repositories;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\OrderId;
use App\Domain\Order\ValueObjects\Email;

interface OrderRepository
{
    public function save(Order $order): void;
    
    public function getById(OrderId $id): Order;
    
    public function findByCustomerEmail(Email $email): array;
    
    public function delete(OrderId $id): void;
}
```

**Key Points**:
- Interface in domain layer
- Implementation in infrastructure layer
- Methods work with domain entities
- No database-specific details

### 4. Domain Services

**Definition**: Business logic that doesn't naturally belong to an entity.

**When to Use**:
- Logic involves multiple entities
- Stateless operations
- Complex calculations or validations

**Example: OrderPricingService**

```php
<?php

namespace App\Domain\Order\Services;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\Money;
use App\Domain\Product\Entities\Product;

final class OrderPricingService
{
    public function calculateTotal(array $products, array $quantities): Money
    {
        $total = new Money(0);
        
        foreach ($products as $index => $product) {
            $quantity = $quantities[$index];
            $lineTotal = $product->getPrice()->multiply($quantity);
            $total = $total->add($lineTotal);
        }
        
        return $total;
    }
    
    public function applyBulkDiscount(Money $total, int $itemCount): Money
    {
        if ($itemCount >= 10) {
            return $total->multiply(0.9); // 10% discount
        }
        
        if ($itemCount >= 5) {
            return $total->multiply(0.95); // 5% discount
        }
        
        return $total;
    }
}
```

### 5. Domain Events

**Definition**: Things that happened in the domain that other parts of the system might care about.

**Example: OrderPlaced Event**

```php
<?php

namespace App\Domain\Order\Events;

use App\Domain\Order\ValueObjects\OrderId;
use App\Domain\Order\ValueObjects\Email;

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

## Design Guidelines

### Entity Design Checklist

- [ ] Has unique identifier
- [ ] Constructor validates all required data
- [ ] Properties are private/protected
- [ ] Only getters exposed (no setters)
- [ ] Business logic in methods, not outside
- [ ] Throws exceptions for invalid operations
- [ ] No framework dependencies

### Value Object Design Checklist

- [ ] Immutable (no setters)
- [ ] Validates in constructor
- [ ] Implements equals() method
- [ ] No unique identifier
- [ ] Can be replaced (not modified)
- [ ] Self-contained validation logic

### Repository Interface Checklist

- [ ] Defined in domain layer
- [ ] Methods accept/return domain entities
- [ ] No database-specific details
- [ ] Clear, business-oriented method names
- [ ] No implementation details

## Common Patterns

### Pattern 1: Factory Methods

```php
class Order
{
    // ... properties
    
    public static function createFromEbook(
        OrderId $id,
        Email $email,
        Ebook $ebook,
        int $quantity
    ): self {
        $total = $ebook->getPrice()->multiply($quantity);
        return new self($id, $email, $total);
    }
}
```

### Pattern 2: Aggregate Root

```php
class Order // Aggregate Root
{
    private OrderId $id;
    private array $items = []; // OrderItem entities
    
    public function addItem(OrderItem $item): void
    {
        // Validate business rules
        if (count($this->items) >= 10) {
            throw new \DomainException('Maximum 10 items per order');
        }
        
        $this->items[] = $item;
    }
    
    // Only Order can modify OrderItems
    public function removeItem(int $index): void
    {
        if (!isset($this->items[$index])) {
            throw new \InvalidArgumentException('Item not found');
        }
        
        unset($this->items[$index]);
    }
}
```

### Pattern 3: Specification

```php
interface OrderSpecification
{
    public function isSatisfiedBy(Order $order): bool;
}

class HighValueOrderSpecification implements OrderSpecification
{
    private Money $threshold;
    
    public function __construct(Money $threshold)
    {
        $this->threshold = $threshold;
    }
    
    public function isSatisfiedBy(Order $order): bool
    {
        return $order->getTotalAmount()->getAmount() >= $this->threshold->getAmount();
    }
}
```

## Testing Domain Layer

### Unit Test Example

```php
<?php

namespace Tests\Unit\Domain\Order;

use PHPUnit\Framework\TestCase;
use App\Domain\Order\Entities\Order;
use App\Domain\Order\ValueObjects\OrderId;
use App\Domain\Order\ValueObjects\Email;
use App\Domain\Order\ValueObjects\Money;

class OrderTest extends TestCase
{
    public function test_creates_order_successfully(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $this->assertEquals(1, $order->getId()->getValue());
        $this->assertEquals('test@example.com', $order->getCustomerEmail()->getValue());
        $this->assertEquals(10000, $order->getTotalAmount()->getAmount());
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
    
    public function test_cannot_confirm_non_pending_order(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $order->confirm();
        
        $this->expectException(\DomainException::class);
        $order->confirm(); // Try to confirm again
    }
    
    public function test_applies_discount_correctly(): void
    {
        $order = new Order(
            new OrderId(1),
            new Email('test@example.com'),
            new Money(10000)
        );
        
        $order->applyDiscount(10); // 10% discount
        
        $this->assertEquals(9000, $order->getTotalAmount()->getAmount());
    }
}
```

## Best Practices

1. **Keep entities focused**: One entity, one responsibility
2. **Use value objects**: Replace primitives with value objects
3. **Validate early**: Constructor validation prevents invalid states
4. **Immutability**: Prefer immutable objects when possible
5. **No anemic models**: Entities should have behavior, not just data
6. **Domain language**: Use business terms, not technical terms

## Common Mistakes

❌ **Anemic Domain Model**:
```php
class Order {
    public int $id;
    public string $email;
    public int $total;
}

// Logic elsewhere
$order->total = $order->quantity * $price;
```

✅ **Rich Domain Model**:
```php
class Order {
    private int $total;
    
    public function __construct(int $quantity, Money $price) {
        $this->total = $price->multiply($quantity);
    }
}
```

❌ **Framework Dependencies**:
```php
use Illuminate\Database\Eloquent\Model;

class Order extends Model { } // Domain depends on framework!
```

✅ **Pure Domain**:
```php
class Order {
    // Pure PHP, no framework
}
```

## Next Steps

- Read `03-application-layer.md` to learn how to use domain entities in use cases
- Read `05-repository-pattern.md` for implementing data access
- Check `templates/domain/` for ready-to-use templates

---

**Remember**: The domain layer is the most valuable part of your codebase. Keep it pure, focused, and well-tested!
