# Guide 01: Project Setup

## Overview

This guide walks you through setting up a new web application project with Clean Architecture structure. You'll create the proper folder structure and configure your project to support the layered architecture.

## Prerequisites

- Basic understanding of your chosen framework (Laravel, Express.js, Spring Boot, etc.)
- Familiarity with dependency injection concepts
- Understanding of Clean Architecture principles (read SKILL.md first)

## Step 1: Create Base Directory Structure

Create the following folder structure in your `src/` directory:

```
src/
├── domain/              # Domain Layer (Core Business Logic)
│   └── [context]/       # Bounded context (e.g., order, user, product)
│       ├── entities/
│       ├── value-objects/
│       ├── repositories/
│       ├── services/
│       └── events/
│
├── application/         # Application Layer (Use Cases)
│   └── [context]/
│       ├── commands/
│       ├── queries/
│       ├── handlers/
│       └── ports/
│
└── infrastructure/      # Infrastructure Layer (Technical Details)
    ├── persistence/     # Database implementations
    ├── web/            # HTTP controllers, routes
    ├── messaging/      # Message queue adapters
    ├── external/       # Third-party integrations
    └── config/         # Framework configuration
```

### Create Directories (Example: PHP/Laravel)

```bash
# Navigate to your project root
cd your-project

# Create domain layer structure
mkdir -p src/domain/order/{entities,value-objects,repositories,services,events}
mkdir -p src/domain/user/{entities,value-objects,repositories,services,events}

# Create application layer structure
mkdir -p src/application/order/{commands,queries,handlers,ports}
mkdir -p src/application/user/{commands,queries,handlers,ports}

# Create infrastructure layer structure
mkdir -p src/infrastructure/{persistence,web,messaging,external,config}
```

### Create Directories (Example: Node.js/TypeScript)

```bash
# Navigate to your project root
cd your-project

# Create domain layer structure
mkdir -p src/domain/order/{entities,value-objects,repositories,services,events}
mkdir -p src/domain/user/{entities,value-objects,repositories,services,events}

# Create application layer structure
mkdir -p src/application/order/{commands,queries,handlers,ports}
mkdir -p src/application/user/{commands,queries,handlers,ports}

# Create infrastructure layer structure
mkdir -p src/infrastructure/{persistence,web,messaging,external,config}
```

## Step 2: Configure Autoloading

### For PHP (composer.json)

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

### For Node.js/TypeScript (tsconfig.json)

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@domain/*": ["src/domain/*"],
            "@application/*": ["src/application/*"],
            "@infrastructure/*": ["src/infrastructure/*"]
        }
    }
}
```

### For Java (Maven pom.xml)

```xml
<build>
    <sourceDirectory>src/domain</sourceDirectory>
    <sourceDirectory>src/application</sourceDirectory>
    <sourceDirectory>src/infrastructure</sourceDirectory>
</build>
```

## Step 3: Create README for Each Layer

Document the purpose of each layer to help team members understand the architecture.

### src/domain/README.md

```markdown
# Domain Layer

**Purpose**: Contains pure business logic and domain rules.

**Rules**:
- NO framework dependencies
- NO database operations
- NO HTTP/API calls
- NO file I/O operations
- Must be testable in isolation

**Contains**:
- Entities: Objects with identity (e.g., Order, User)
- Value Objects: Immutable values (e.g., Email, Money)
- Repository Interfaces: Contracts for data access
- Domain Services: Business logic not belonging to entities
- Domain Events: Things that happened in the domain
```

### src/application/README.md

```markdown
# Application Layer

**Purpose**: Orchestrates use cases and coordinates domain logic.

**Rules**:
- Only depends on Domain layer
- NO infrastructure dependencies
- Uses repository interfaces (not implementations)
- NO direct database access

**Contains**:
- Commands: Write operation DTOs
- Queries: Read operation DTOs
- Handlers: Use case implementations
- Ports: Interfaces for external services
```

### src/infrastructure/README.md

```markdown
# Infrastructure Layer

**Purpose**: Implements technical details and external integrations.

**Rules**:
- Can depend on Domain and Application layers
- Contains all framework-specific code
- Implements repository interfaces from Domain
- Handles HTTP, database, file I/O, etc.

**Contains**:
- Persistence: Repository implementations
- Web: Controllers, routes, middleware
- Messaging: Queue/event bus adapters
- External: Third-party API clients
- Config: Framework configuration
```

## Step 4: Setup Dependency Injection Container

Configure your DI container to bind interfaces to implementations.

### Laravel (app/Providers/AppServiceProvider.php)

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Order\OrderRepository;
use App\Infrastructure\Persistence\SqlOrderRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind repository interfaces to implementations
        $this->app->bind(OrderRepository::class, SqlOrderRepository::class);
        
        // Bind application handlers
        $this->app->singleton(PlaceOrderHandler::class);
    }
}
```

### Node.js/TypeScript (with InversifyJS)

```typescript
// src/infrastructure/config/container.ts
import { Container } from 'inversify';
import { OrderRepository } from '@domain/order/repositories/OrderRepository';
import { SqlOrderRepository } from '@infrastructure/persistence/SqlOrderRepository';

const container = new Container();

// Bind repositories
container.bind<OrderRepository>('OrderRepository').to(SqlOrderRepository);

export { container };
```

### Spring Boot (Java)

```java
// src/infrastructure/config/ApplicationConfig.java
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

## Step 5: Create Example Module

Create a simple example to verify your setup works.

### 1. Create Domain Entity

```php
// src/domain/order/entities/Order.php
<?php

namespace App\Domain\Order\Entities;

final class Order
{
    private int $id;
    private string $email;
    private int $totalAmount;
    
    public function __construct(int $id, string $email, int $totalAmount)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email');
        }
        
        if ($totalAmount < 0) {
            throw new \InvalidArgumentException('Amount cannot be negative');
        }
        
        $this->id = $id;
        $this->email = $email;
        $this->totalAmount = $totalAmount;
    }
    
    public function getId(): int
    {
        return $this->id;
    }
    
    public function getEmail(): string
    {
        return $this->email;
    }
    
    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }
}
```

### 2. Create Repository Interface

```php
// src/domain/order/repositories/OrderRepository.php
<?php

namespace App\Domain\Order\Repositories;

use App\Domain\Order\Entities\Order;

interface OrderRepository
{
    public function save(Order $order): int;
    public function getById(int $id): Order;
}
```

### 3. Create Repository Implementation

```php
// src/infrastructure/persistence/SqlOrderRepository.php
<?php

namespace App\Infrastructure\Persistence;

use App\Domain\Order\Entities\Order;
use App\Domain\Order\Repositories\OrderRepository;
use Illuminate\Support\Facades\DB;

final class SqlOrderRepository implements OrderRepository
{
    public function save(Order $order): int
    {
        return DB::table('orders')->insertGetId([
            'email' => $order->getEmail(),
            'total_amount' => $order->getTotalAmount(),
        ]);
    }
    
    public function getById(int $id): Order
    {
        $record = DB::table('orders')->find($id);
        
        if (!$record) {
            throw new \RuntimeException("Order not found: {$id}");
        }
        
        return new Order(
            $record->id,
            $record->email,
            $record->total_amount
        );
    }
}
```

### 4. Create Simple Test

```php
// tests/Unit/Domain/Order/OrderTest.php
<?php

namespace Tests\Unit\Domain\Order;

use PHPUnit\Framework\TestCase;
use App\Domain\Order\Entities\Order;

class OrderTest extends TestCase
{
    public function test_creates_order_with_valid_data(): void
    {
        $order = new Order(1, 'test@example.com', 1000);
        
        $this->assertEquals(1, $order->getId());
        $this->assertEquals('test@example.com', $order->getEmail());
        $this->assertEquals(1000, $order->getTotalAmount());
    }
    
    public function test_throws_exception_for_invalid_email(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        new Order(1, 'invalid-email', 1000);
    }
    
    public function test_throws_exception_for_negative_amount(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        new Order(1, 'test@example.com', -100);
    }
}
```

Run test: `php artisan test` or `npm test`

## Step 6: Verify Setup

### Checklist

- [ ] Directory structure created correctly
- [ ] Autoloading configured
- [ ] DI container configured
- [ ] README files created for each layer
- [ ] Example module created
- [ ] Tests passing

### Test Your Setup

1. **Run tests**: Ensure your example test passes
2. **Check autoloading**: Try importing classes from each layer
3. **Verify DI**: Ensure repository binding works
4. **Check dependencies**: Domain should not import Infrastructure

## Common Issues and Solutions

### Issue 1: Autoloading Not Working

**Problem**: Classes not found
**Solution**: 
- PHP: Run `composer dump-autoload`
- Node.js: Restart TypeScript compiler
- Java: Run `mvn clean install`

### Issue 2: Circular Dependencies

**Problem**: Classes depend on each other
**Solution**: Use interfaces to break the cycle. Domain defines interfaces, Infrastructure implements them.

### Issue 3: Framework Dependencies in Domain

**Problem**: Domain layer imports framework code
**Solution**: Remove framework imports. Use pure language features only.

## Next Steps

Now that your project is set up:

1. Read `02-domain-layer.md` to learn how to design domain entities
2. Read `03-application-layer.md` to create use cases
3. Read `04-infrastructure-layer.md` to implement controllers and repositories

## Resources

- **SOP.md**: Detailed architecture rules
- **architecture-compliance.md**: Validation checklist
- **templates/**: Code templates for each layer

---

**Remember**: The initial setup is crucial. Take time to get it right, and your codebase will thank you later!
