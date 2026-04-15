# Decision Tree: Entity vs Value Object

## Question Flow

### Start Here: What are you modeling?

```
Does it have a unique identity that matters?
│
├─ YES → Is the identity important for equality?
│   │
│   ├─ YES → **ENTITY**
│   │
│   └─ NO → Does it change over time?
│       │
│       ├─ YES → **ENTITY**
│       └─ NO → **VALUE OBJECT**
│
└─ NO → Is it defined by its attributes?
    │
    ├─ YES → Should it be immutable?
    │   │
    │   ├─ YES → **VALUE OBJECT**
    │   └─ NO → Consider **ENTITY** or refactor
    │
    └─ NO → Reconsider your model
```

## Quick Decision Matrix

| Characteristic | Entity | Value Object |
|---|---|---|
| Has unique ID | ✅ Yes | ❌ No |
| Identity matters | ✅ Yes | ❌ No |
| Can change state | ✅ Yes | ❌ No (immutable) |
| Equality by ID | ✅ Yes | ❌ No (by values) |
| Lifespan | Long-lived | Replaceable |
| Example | Order, User | Email, Money |

## Examples

### Entity Examples

**Order**
- ✅ Has unique OrderId
- ✅ Identity matters (Order #123 ≠ Order #124)
- ✅ Changes state (pending → confirmed → shipped)
- ✅ Equality by ID

```php
class Order {
    private OrderId $id;
    private Money $total;
    private OrderStatus $status;
    
    // Two orders with same total are DIFFERENT if IDs differ
}
```

**User**
- ✅ Has unique UserId
- ✅ Identity matters
- ✅ Changes state (email, password, profile)
- ✅ Equality by ID

```php
class User {
    private UserId $id;
    private Email $email;
    private string $name;
    
    // Same person even if email changes
}
```

### Value Object Examples

**Email**
- ❌ No unique ID
- ❌ Identity doesn't matter
- ❌ Immutable (create new if changing)
- ✅ Equality by value

```php
final class Email {
    private string $value;
    
    public function __construct(string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException();
        }
        $this->value = $value;
    }
    
    public function equals(Email $other): bool {
        return $this->value === $other->value;
    }
    
    // Two emails with same value are IDENTICAL
}
```

**Money**
- ❌ No unique ID
- ❌ Identity doesn't matter
- ❌ Immutable
- ✅ Equality by value (amount + currency)

```php
final class Money {
    private int $amount;
    private string $currency;
    
    public function add(Money $other): Money {
        return new Money($this->amount + $other->amount, $this->currency);
    }
    
    // $10 USD = $10 USD (same value)
}
```

**DateRange**
- ❌ No unique ID
- ❌ Identity doesn't matter
- ❌ Immutable
- ✅ Equality by value (start + end dates)

```php
final class DateRange {
    private \DateTimeImmutable $start;
    private \DateTimeImmutable $end;
    
    public function contains(\DateTimeImmutable $date): bool {
        return $date >= $this->start && $date <= $this->end;
    }
}
```

## Common Scenarios

### Scenario 1: Address

**Question**: Is Address an Entity or Value Object?

**Answer**: Usually **Value Object**

**Reasoning**:
- No unique ID needed
- Defined by street, city, zip, country
- Two addresses with same values are identical
- Immutable (create new if changing)

```php
final class Address {
    public function __construct(
        private string $street,
        private string $city,
        private string $zipCode,
        private string $country
    ) {}
    
    public function equals(Address $other): bool {
        return $this->street === $other->street
            && $this->city === $other->city
            && $this->zipCode === $other->zipCode
            && $this->country === $other->country;
    }
}
```

**Exception**: If you need to track address history or changes, make it an Entity.

### Scenario 2: Product

**Question**: Is Product an Entity or Value Object?

**Answer**: **Entity**

**Reasoning**:
- Has unique ProductId
- Identity matters (Product #1 ≠ Product #2)
- Changes state (price, stock, description)
- Equality by ID

```php
class Product {
    private ProductId $id;
    private string $name;
    private Money $price;
    private int $stock;
    
    // Product identity persists even if price changes
}
```

### Scenario 3: Phone Number

**Question**: Is PhoneNumber an Entity or Value Object?

**Answer**: **Value Object**

**Reasoning**:
- No unique ID
- Defined by number itself
- Immutable
- Two same numbers are identical

```php
final class PhoneNumber {
    private string $value;
    
    public function __construct(string $value) {
        // Validate format
        $this->value = $this->normalize($value);
    }
    
    public function equals(PhoneNumber $other): bool {
        return $this->value === $other->value;
    }
}
```

### Scenario 4: Shopping Cart Item

**Question**: Is CartItem an Entity or Value Object?

**Answer**: Depends on requirements

**Option A: Value Object** (if quantity is the only thing that matters)
```php
final class CartItem {
    public function __construct(
        private ProductId $productId,
        private int $quantity
    ) {}
}
```

**Option B: Entity** (if you need to track when added, modifications, etc.)
```php
class CartItem {
    private CartItemId $id;
    private ProductId $productId;
    private int $quantity;
    private \DateTimeImmutable $addedAt;
}
```

## Decision Checklist

Use this checklist to decide:

### Choose Entity if:
- [ ] Has a unique identifier
- [ ] Identity is important for business logic
- [ ] State changes over time
- [ ] Needs to be tracked individually
- [ ] Has a lifecycle (created, modified, deleted)

### Choose Value Object if:
- [ ] No unique identifier needed
- [ ] Defined entirely by its attributes
- [ ] Should be immutable
- [ ] Can be replaced rather than modified
- [ ] Equality based on values, not identity

## Common Mistakes

### ❌ Mistake 1: Making everything an Entity

```php
// Wrong: Email as Entity
class Email {
    private int $id; // Unnecessary!
    private string $value;
}
```

**Fix**: Use Value Object
```php
final class Email {
    private string $value; // No ID needed
}
```

### ❌ Mistake 2: Mutable Value Objects

```php
// Wrong: Mutable Money
class Money {
    public function setAmount(int $amount): void {
        $this->amount = $amount; // Violates immutability!
    }
}
```

**Fix**: Return new instance
```php
final class Money {
    public function add(Money $other): Money {
        return new Money($this->amount + $other->amount);
    }
}
```

### ❌ Mistake 3: Value Object with ID

```php
// Wrong: Value Object with identity
final class Address {
    private int $id; // Value Objects don't have IDs!
}
```

**Fix**: Remove ID or make it an Entity if identity is truly needed.

## Summary

**Entity**: "Who it is" matters
- Order #123 is different from Order #124
- User with ID 1 is different from User with ID 2

**Value Object**: "What it is" matters
- $10 USD is the same as $10 USD
- test@example.com is the same as test@example.com

---

**When in doubt**: Start with Value Object. It's easier to convert to Entity later than vice versa.
