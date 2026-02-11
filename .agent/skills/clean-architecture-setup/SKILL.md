---
name: Clean Architecture Setup
description: Setup and implement Clean Architecture with Domain-Driven Design for web applications, ensuring proper separation between core business logic and infrastructure code.
---

# Clean Architecture Setup Skill

## Purpose

This skill helps you design and implement web applications following Clean Architecture principles and Domain-Driven Design (DDD). It ensures:

- **Clear separation** between Core Code (business logic) and Infrastructure Code (technical details)
- **Maintainable codebase** that's easy to test, extend, and refactor
- **Framework-agnostic** domain layer that can survive technology changes
- **Testable code** with high coverage and fast unit tests

## When to Use This Skill

Use this skill when:

- ✅ Starting a **new web application** project
- ✅ **Refactoring legacy code** to improve architecture
- ✅ Building **complex business logic** that needs to be maintainable
- ✅ Creating applications that may need to **change frameworks** or databases
- ✅ Working on projects requiring **high test coverage**
- ✅ Implementing **Domain-Driven Design** patterns

## Core Principles

### 1. Core Code vs Infrastructure Code

**Core Code** (Business Logic):
- Runs in any context without external dependencies
- No database, HTTP, file system, or framework dependencies
- Pure business logic and domain rules
- Fully testable in isolation

**Infrastructure Code** (Technical Details):
- Connects application to external systems
- Database access, HTTP clients, file I/O
- Framework-specific components
- Third-party integrations

### 2. Layered Architecture

```
┌─────────────────────────────────────────┐
│      INFRASTRUCTURE LAYER               │
│  (Controllers, DB, APIs, Framework)     │
└─────────────────┬───────────────────────┘
                  │ depends on
┌─────────────────▼───────────────────────┐
│      APPLICATION LAYER                  │
│  (Use Cases, Handlers, Orchestration)   │
└─────────────────┬───────────────────────┘
                  │ depends on
┌─────────────────▼───────────────────────┐
│         DOMAIN LAYER                    │
│  (Entities, Value Objects, Rules)       │
└─────────────────────────────────────────┘
```

**Dependency Rule**: Infrastructure → Application → Domain (always inward)

### 3. Key Patterns

- **Domain Model Pattern**: Encapsulate business logic in entities and value objects
- **Repository Pattern**: Abstract data access behind interfaces
- **Dependency Injection**: Inject dependencies via constructors
- **Command/Query Pattern**: Separate write and read operations

## How to Use This Skill

### Step 1: Understand the Architecture

Read the reference documents:
- `SOP.md` - Standard Operating Procedure with detailed rules
- `Doc.md` - Comprehensive guide on Clean Architecture concepts

### Step 2: Follow the Guides

Work through guides in order:
1. `guides/01-project-setup.md` - Initial project structure
2. `guides/02-domain-layer.md` - Create domain entities and value objects
3. `guides/03-application-layer.md` - Build use cases and handlers
4. `guides/04-infrastructure-layer.md` - Implement repositories and controllers
5. `guides/05-repository-pattern.md` - Master the repository pattern
6. `guides/06-dependency-injection.md` - Setup DI container
7. `guides/07-testing-strategy.md` - Write comprehensive tests

### Step 3: Use Decision Trees

When unsure about design decisions:
- `decision-trees/entity-vs-value-object.md` - Choose between Entity and Value Object
- `decision-trees/repository-vs-service.md` - Decide where logic belongs
- `decision-trees/where-to-put-code.md` - Determine correct layer for code

### Step 4: Apply Templates

Use code templates for consistency:
- **Domain Layer**: Entity, Value Object, Repository Interface
- **Application Layer**: Command, Handler, Service
- **Infrastructure Layer**: Controller, Repository Implementation, DI Container

### Step 5: Validate with Checklists

Before committing code:
- `checklists/pre-commit-checklist.md` - Ensure architecture compliance
- `checklists/code-review-checklist.md` - Review code quality

### Step 6: Refactor Legacy Code

For existing projects:
- `refactoring/legacy-to-clean.md` - Strategy for refactoring
- `refactoring/step-by-step-refactor.md` - Incremental refactoring steps

## Quick Start Example

### 1. Create Domain Entity

```php
// src/domain/order/Order.php
final class Order {
    private int $id;
    private string $email;
    private int $quantity;
    private int $totalAmount;
    
    public function __construct(int $id, string $email, int $quantity, int $pricePerUnit) {
        if ($quantity <= 0) throw new InvalidArgumentException('Invalid quantity');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('Invalid email');
        
        $this->id = $id;
        $this->email = $email;
        $this->quantity = $quantity;
        $this->totalAmount = $quantity * $pricePerUnit;
    }
    
    public function getTotalAmount(): int {
        return $this->totalAmount;
    }
}
```

### 2. Define Repository Interface (Domain Layer)

```php
// src/domain/order/OrderRepository.php
interface OrderRepository {
    public function save(Order $order): int;
    public function getById(int $id): Order;
}
```

### 3. Create Application Handler

```php
// src/application/order/PlaceOrderHandler.php
class PlaceOrderHandler {
    public function __construct(
        private OrderRepository $orderRepo,
        private EbookRepository $ebookRepo
    ) {}
    
    public function handle(PlaceOrderCommand $command): int {
        $ebook = $this->ebookRepo->getById($command->ebookId);
        $order = new Order($command->id, $command->email, $command->quantity, $ebook->price);
        return $this->orderRepo->save($order);
    }
}
```

### 4. Implement Repository (Infrastructure Layer)

```php
// src/infrastructure/persistence/SqlOrderRepository.php
class SqlOrderRepository implements OrderRepository {
    public function save(Order $order): int {
        return DB::table('orders')->insertGetId([
            'email' => $order->getEmail(),
            'quantity' => $order->getQuantity(),
            'amount' => $order->getTotalAmount()
        ]);
    }
}
```

### 5. Create Controller (Infrastructure Layer)

```php
// src/infrastructure/web/OrderController.php
class OrderController {
    public function __construct(private PlaceOrderHandler $handler) {}
    
    public function store(Request $request): Response {
        $command = new PlaceOrderCommand(
            $request->input('ebook_id'),
            $request->input('email'),
            $request->input('quantity')
        );
        
        $orderId = $this->handler->handle($command);
        return response()->json(['order_id' => $orderId], 201);
    }
}
```

## Common Mistakes to Avoid

❌ **Don't**: Put business logic in controllers
✅ **Do**: Move logic to domain entities or application services

❌ **Don't**: Make domain entities depend on frameworks (e.g., JPA annotations)
✅ **Do**: Keep domain entities pure, map in infrastructure layer

❌ **Don't**: Call repositories directly from controllers
✅ **Do**: Use application handlers/services as intermediaries

❌ **Don't**: Use domain entities for read operations
✅ **Do**: Create separate read models/view models

## Benefits

- 🧪 **Highly Testable**: Core logic runs without database or framework
- 🔄 **Easy to Change**: Swap databases, frameworks, or external services
- 📖 **Readable Code**: Business logic clearly separated from technical details
- 🛡️ **Data Integrity**: Validation enforced at domain level
- 🚀 **Long-term Maintainability**: Architecture scales with complexity

## Resources

- **SOP.md**: Complete standard operating procedure
- **Doc.md**: In-depth architectural documentation
- **architecture-compliance.md**: Validation rules and compliance checks
- **guides/**: Step-by-step implementation guides
- **templates/**: Ready-to-use code templates
- **examples/**: Complete example modules

## Support

For questions or clarifications:
1. Check decision trees for design guidance
2. Review examples for reference implementations
3. Consult SOP.md for detailed rules
4. Use checklists to validate your work

---

**Remember**: The goal is not perfect architecture from day one, but a clear separation that makes your codebase maintainable and testable as it grows.
