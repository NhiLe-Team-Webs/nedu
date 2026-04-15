# Architecture Compliance Guide

## Purpose

This document defines the rules and validation criteria to ensure your codebase complies with Clean Architecture principles. Use this as a reference when reviewing code or setting up automated checks.

## Core Compliance Rules

### Rule 1: Dependency Direction

**Rule**: Dependencies must always point inward (Infrastructure → Application → Domain)

**Validation**:
- ✅ Domain layer has NO imports from Application or Infrastructure
- ✅ Application layer only imports from Domain
- ✅ Infrastructure layer can import from both Application and Domain
- ❌ Domain NEVER imports framework code
- ❌ Domain NEVER imports database libraries
- ❌ Application NEVER imports Infrastructure

**How to Check**:
```bash
# Check domain layer has no external dependencies
grep -r "use.*Infrastructure" src/domain/
grep -r "use.*Application" src/domain/
# Should return nothing

# Check application doesn't import infrastructure
grep -r "use.*Infrastructure" src/application/
# Should return nothing
```

### Rule 2: Core Code Independence

**Rule**: Core code (Domain + Application) must run without external systems

**Validation**:
- ✅ Domain entities can be instantiated with `new` keyword only
- ✅ Domain logic works in pure PHP/JavaScript/etc without framework
- ✅ Application services can be tested with fake repositories
- ❌ No direct database calls in Domain or Application
- ❌ No HTTP client usage in Domain or Application
- ❌ No file system operations in Domain or Application

**How to Check**:
```bash
# Check for database operations in core code
grep -r "DB::" src/domain/ src/application/
grep -r "query\|insert\|update\|delete" src/domain/ src/application/

# Check for HTTP calls
grep -r "Http::\|curl\|guzzle" src/domain/ src/application/

# Check for file operations
grep -r "file_get_contents\|fopen\|Storage::" src/domain/ src/application/
```

### Rule 3: Interface Segregation

**Rule**: Domain defines interfaces, Infrastructure implements them

**Validation**:
- ✅ Repository interfaces in `domain/[context]/repositories/`
- ✅ Repository implementations in `infrastructure/persistence/`
- ✅ Domain services use interfaces, not concrete classes
- ❌ No concrete infrastructure classes in domain layer
- ❌ No interface definitions in infrastructure layer (except adapters)

**Directory Structure Check**:
```
src/
├── domain/
│   └── [context]/
│       └── repositories/          ✅ Interfaces here
│           └── IOrderRepository.php
├── infrastructure/
│   └── persistence/               ✅ Implementations here
│       └── SqlOrderRepository.php
```

### Rule 4: Entity Validation

**Rule**: Domain entities must validate themselves

**Validation**:
- ✅ Constructor validates all required fields
- ✅ Invalid data throws exceptions
- ✅ Properties are private/protected
- ✅ Only getters exposed (no setters for immutability)
- ❌ No public properties
- ❌ No validation in controllers or repositories

**Code Pattern**:
```php
// ✅ CORRECT
class Order {
    private string $email;
    
    public function __construct(string $email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }
        $this->email = $email;
    }
    
    public function getEmail(): string {
        return $this->email;
    }
}

// ❌ WRONG
class Order {
    public string $email; // Public property
    
    public function __construct(string $email) {
        $this->email = $email; // No validation
    }
}
```

### Rule 5: Controller Responsibility

**Rule**: Controllers only handle HTTP concerns, not business logic

**Validation**:
- ✅ Controllers receive requests
- ✅ Controllers create Commands/Queries
- ✅ Controllers call Application Handlers
- ✅ Controllers return HTTP responses
- ❌ No business logic in controllers
- ❌ No direct repository calls from controllers
- ❌ No database queries in controllers

**Code Pattern**:
```php
// ✅ CORRECT
class OrderController {
    public function __construct(private PlaceOrderHandler $handler) {}
    
    public function store(Request $request): Response {
        $command = new PlaceOrderCommand(
            $request->input('ebook_id'),
            $request->input('email'),
            $request->input('quantity')
        );
        
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId]);
    }
}

// ❌ WRONG
class OrderController {
    public function store(Request $request): Response {
        $price = DB::table('ebooks')->where('id', $request->ebook_id)->value('price');
        $total = $request->quantity * $price; // Business logic in controller
        DB::table('orders')->insert([...]); // Direct DB access
        return response()->json(['success' => true]);
    }
}
```

### Rule 6: Repository Pattern

**Rule**: Repositories abstract data access and return domain entities

**Validation**:
- ✅ Repository methods return Domain Entities
- ✅ Repository methods accept Domain Entities
- ✅ Mapping between DB models and Entities happens in repository
- ❌ No ORM models exposed outside repository
- ❌ No raw arrays returned (use entities or DTOs)
- ❌ No business logic in repositories

**Code Pattern**:
```php
// ✅ CORRECT
interface OrderRepository {
    public function save(Order $order): int;
    public function getById(int $id): Order;
}

class SqlOrderRepository implements OrderRepository {
    public function save(Order $order): int {
        // Map entity to DB
        return DB::table('orders')->insertGetId([
            'email' => $order->getEmail(),
            'amount' => $order->getTotalAmount()
        ]);
    }
    
    public function getById(int $id): Order {
        $record = DB::table('orders')->find($id);
        // Map DB to entity
        return new Order($record->email, $record->quantity, $record->price);
    }
}

// ❌ WRONG
class OrderRepository {
    public function save(array $data): int {
        return DB::table('orders')->insertGetId($data);
    }
    
    public function getById(int $id): array {
        return DB::table('orders')->find($id); // Returns array, not entity
    }
}
```

### Rule 7: Dependency Injection

**Rule**: Use constructor injection with interfaces

**Validation**:
- ✅ Dependencies injected via constructor
- ✅ Type-hint interfaces, not concrete classes
- ✅ Use framework's DI container
- ❌ No service locator pattern
- ❌ No static method calls in domain/application
- ❌ No global state or singletons

**Code Pattern**:
```php
// ✅ CORRECT
class PlaceOrderHandler {
    public function __construct(
        private OrderRepository $orderRepo,  // Interface
        private EbookRepository $ebookRepo   // Interface
    ) {}
}

// ❌ WRONG
class PlaceOrderHandler {
    public function handle() {
        $repo = app('OrderRepository'); // Service locator
        $repo = OrderRepository::getInstance(); // Singleton
    }
}
```

### Rule 8: Testing Strategy

**Rule**: Core code must be testable without external dependencies

**Validation**:
- ✅ Unit tests for domain entities (no DB needed)
- ✅ Unit tests for application handlers (with fake repos)
- ✅ Integration tests for repositories (with real DB)
- ✅ Test coverage ≥ 80% for domain and application layers
- ❌ No unit tests requiring database
- ❌ No unit tests requiring HTTP server

**Test Pattern**:
```php
// ✅ CORRECT - Unit test without DB
class OrderTest extends TestCase {
    public function test_calculates_total_correctly() {
        $order = new Order('test@example.com', 3, 100);
        $this->assertEquals(300, $order->getTotalAmount());
    }
}

class PlaceOrderHandlerTest extends TestCase {
    public function test_places_order_successfully() {
        $fakeOrderRepo = new InMemoryOrderRepository();
        $fakeEbookRepo = new InMemoryEbookRepository();
        $handler = new PlaceOrderHandler($fakeOrderRepo, $fakeEbookRepo);
        
        $command = new PlaceOrderCommand(1, 'test@example.com', 2);
        $orderId = $handler->handle($command);
        
        $this->assertNotNull($orderId);
    }
}
```

## Automated Compliance Checks

### Static Analysis Tools

**PHPStan / Psalm (PHP)**:
```yaml
# phpstan.neon
parameters:
    level: 8
    paths:
        - src
    excludePaths:
        - vendor
```

**ESLint (JavaScript/TypeScript)**:
```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["**/infrastructure/**"],
        "message": "Domain and Application layers cannot import Infrastructure"
      }]
    }]
  }
}
```

### Custom Validation Scripts

**Check Dependency Direction**:
```bash
#!/bin/bash
# check-dependencies.sh

echo "Checking domain layer dependencies..."
if grep -r "use.*Infrastructure\|use.*Illuminate" src/domain/; then
    echo "❌ Domain layer has infrastructure dependencies!"
    exit 1
fi

echo "Checking application layer dependencies..."
if grep -r "use.*Infrastructure" src/application/; then
    echo "❌ Application layer has infrastructure dependencies!"
    exit 1
fi

echo "✅ Dependency direction is correct"
```

**Check for Direct DB Access**:
```bash
#!/bin/bash
# check-db-access.sh

echo "Checking for direct DB access in core code..."
if grep -r "DB::\|Eloquent\|query()" src/domain/ src/application/; then
    echo "❌ Found direct database access in core code!"
    exit 1
fi

echo "✅ No direct DB access in core code"
```

## Compliance Checklist

Use this checklist before merging code:

### Domain Layer
- [ ] No framework imports
- [ ] No database operations
- [ ] All entities validate in constructor
- [ ] Properties are private/protected
- [ ] Only interfaces defined (no implementations)
- [ ] No HTTP or file I/O operations

### Application Layer
- [ ] Only imports from Domain
- [ ] Uses repository interfaces (not implementations)
- [ ] No direct database access
- [ ] Commands/Queries are simple DTOs
- [ ] Handlers orchestrate, don't contain business logic

### Infrastructure Layer
- [ ] Implements domain interfaces
- [ ] Contains all framework-specific code
- [ ] Controllers only handle HTTP concerns
- [ ] Repositories map between DB and entities
- [ ] No business logic in controllers or repositories

### Testing
- [ ] Domain entities have unit tests
- [ ] Application handlers tested with fakes
- [ ] Repositories have integration tests
- [ ] No unit tests require database
- [ ] Test coverage ≥ 80% for core code

## Violation Examples and Fixes

### Violation 1: Business Logic in Controller

**❌ Before**:
```php
class OrderController {
    public function store(Request $request) {
        $price = DB::table('ebooks')->value('price');
        $total = $request->quantity * $price;
        DB::table('orders')->insert(['total' => $total]);
    }
}
```

**✅ After**:
```php
class OrderController {
    public function __construct(private PlaceOrderHandler $handler) {}
    
    public function store(Request $request) {
        $command = new PlaceOrderCommand($request->ebook_id, $request->quantity);
        $this->handler->handle($command);
    }
}
```

### Violation 2: Domain Depending on Framework

**❌ Before**:
```php
use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    protected $fillable = ['email', 'amount'];
}
```

**✅ After**:
```php
// Domain entity (pure PHP)
class Order {
    private string $email;
    private int $amount;
    
    public function __construct(string $email, int $amount) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException('Invalid email');
        }
        $this->email = $email;
        $this->amount = $amount;
    }
}

// Separate Eloquent model in infrastructure
class OrderModel extends Model {
    protected $table = 'orders';
}
```

### Violation 3: Repository Returning Arrays

**❌ Before**:
```php
class OrderRepository {
    public function getById(int $id): array {
        return DB::table('orders')->find($id);
    }
}
```

**✅ After**:
```php
class SqlOrderRepository implements OrderRepository {
    public function getById(int $id): Order {
        $record = DB::table('orders')->find($id);
        return new Order($record->email, $record->quantity, $record->price);
    }
}
```

## Continuous Compliance

### Pre-commit Hooks

```bash
# .git/hooks/pre-commit
#!/bin/bash

echo "Running architecture compliance checks..."

./scripts/check-dependencies.sh || exit 1
./scripts/check-db-access.sh || exit 1

echo "✅ All compliance checks passed"
```

### CI/CD Pipeline

```yaml
# .github/workflows/architecture-check.yml
name: Architecture Compliance

on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check Dependencies
        run: ./scripts/check-dependencies.sh
      - name: Check DB Access
        run: ./scripts/check-db-access.sh
      - name: Run Static Analysis
        run: vendor/bin/phpstan analyse
```

## Summary

Clean Architecture compliance ensures:
- **Maintainability**: Clear separation of concerns
- **Testability**: Core logic runs without infrastructure
- **Flexibility**: Easy to swap frameworks or databases
- **Longevity**: Architecture survives technology changes

Regular compliance checks prevent architectural erosion and keep your codebase healthy.
