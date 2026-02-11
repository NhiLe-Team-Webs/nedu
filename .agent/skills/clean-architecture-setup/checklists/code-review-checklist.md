# Code Review Checklist

Use this checklist when reviewing pull requests to ensure Clean Architecture principles are followed.

## Architecture & Design

### Layer Separation
- [ ] Code is in the correct layer (Domain/Application/Infrastructure)
- [ ] Dependencies flow inward (Infrastructure → Application → Domain)
- [ ] No circular dependencies
- [ ] Domain layer is framework-agnostic

### Abstraction
- [ ] Interfaces defined in domain/application, implementations in infrastructure
- [ ] Code depends on abstractions, not concretions
- [ ] Proper use of dependency injection

## Domain Layer Review

### Entities
- [ ] Entities have unique identifiers
- [ ] Constructor validates all data
- [ ] Properties are encapsulated (private/protected)
- [ ] Business logic is in entity methods, not scattered
- [ ] No framework dependencies
- [ ] Invariants are enforced

### Value Objects
- [ ] Immutable (no setters)
- [ ] Self-validating
- [ ] Equality based on values
- [ ] No identity/ID field

### Repository Interfaces
- [ ] Methods are business-oriented
- [ ] Accept/return domain entities
- [ ] No database-specific details leaked

### Domain Services
- [ ] Stateless
- [ ] Contains logic that doesn't belong to a single entity
- [ ] No infrastructure dependencies

## Application Layer Review

### Commands/Queries
- [ ] Immutable DTOs
- [ ] No business logic
- [ ] Clear intent

### Handlers
- [ ] Single responsibility (one use case)
- [ ] Orchestrates, doesn't implement business logic
- [ ] Uses repository interfaces
- [ ] Proper error handling
- [ ] Transaction management if needed

### View Models
- [ ] Optimized for presentation
- [ ] No business logic
- [ ] Separate from domain entities

## Infrastructure Layer Review

### Controllers
- [ ] Thin controllers (no business logic)
- [ ] Proper HTTP status codes
- [ ] Input validation (format, not business rules)
- [ ] Calls handlers, not repositories directly
- [ ] Proper error handling and responses

### Repository Implementations
- [ ] Implements domain interface correctly
- [ ] Maps between DB models and domain entities
- [ ] No business logic
- [ ] Proper exception handling
- [ ] Efficient queries

### External Adapters
- [ ] Implements application port interface
- [ ] Handles external service errors gracefully
- [ ] Proper logging
- [ ] Configuration externalized

## Code Quality

### Readability
- [ ] Code is self-documenting
- [ ] Meaningful names (variables, methods, classes)
- [ ] Proper formatting and indentation
- [ ] No magic numbers or strings
- [ ] Comments explain "why", not "what"

### SOLID Principles
- [ ] Single Responsibility Principle
- [ ] Open/Closed Principle
- [ ] Liskov Substitution Principle
- [ ] Interface Segregation Principle
- [ ] Dependency Inversion Principle

### DRY (Don't Repeat Yourself)
- [ ] No code duplication
- [ ] Common logic extracted to shared methods/classes
- [ ] Proper abstraction levels

## Testing

### Test Coverage
- [ ] New code has tests
- [ ] Domain entities have unit tests
- [ ] Handlers tested with fakes
- [ ] Repositories have integration tests
- [ ] Critical paths have E2E tests

### Test Quality
- [ ] Tests are readable
- [ ] Tests are maintainable
- [ ] Tests are fast (unit tests)
- [ ] Proper use of fakes vs mocks
- [ ] Arrange-Act-Assert pattern
- [ ] Descriptive test names

### Test Independence
- [ ] Tests don't depend on each other
- [ ] Tests can run in any order
- [ ] Proper setup and teardown

## Security

- [ ] No sensitive data hardcoded
- [ ] Input validation present
- [ ] SQL injection prevented
- [ ] XSS prevention
- [ ] CSRF protection (if applicable)
- [ ] Authentication/authorization checked
- [ ] Proper error messages (no sensitive info leaked)

## Performance

- [ ] No obvious performance issues
- [ ] No N+1 queries
- [ ] Appropriate use of caching
- [ ] Database indexes considered
- [ ] Efficient algorithms

## Database

- [ ] Migrations included
- [ ] Migrations are reversible
- [ ] Proper indexes
- [ ] Foreign keys defined
- [ ] No breaking schema changes

## Documentation

- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] README updated if needed
- [ ] CHANGELOG updated
- [ ] API documentation updated

## Git & PR

- [ ] PR description is clear
- [ ] Commits are atomic
- [ ] Commit messages are descriptive
- [ ] No merge conflicts
- [ ] Branch is up to date
- [ ] No unnecessary files committed

## Common Anti-Patterns to Watch For

### ❌ Anemic Domain Model
```php
class Order {
    public int $total;
    public string $status;
}

// Logic elsewhere
$order->total = $price * $quantity;
```

### ❌ Business Logic in Controller
```php
public function store(Request $request) {
    $total = $request->quantity * $request->price;
    DB::table('orders')->insert(['total' => $total]);
}
```

### ❌ Domain Depending on Framework
```php
use Illuminate\Database\Eloquent\Model;

class Order extends Model { }
```

### ❌ Repository Returning Arrays
```php
public function getById(int $id): array {
    return DB::table('orders')->find($id);
}
```

### ❌ Service Locator Pattern
```php
public function handle() {
    $repo = app('OrderRepository');
}
```

## Review Severity Levels

### 🔴 Critical (Must Fix)
- Architecture violations
- Security issues
- Breaking changes without migration
- Failing tests

### 🟡 Important (Should Fix)
- Code quality issues
- Missing tests
- Performance concerns
- Documentation gaps

### 🟢 Minor (Nice to Have)
- Code style improvements
- Refactoring suggestions
- Optimization opportunities

## Approval Criteria

**Approve if**:
- ✅ No critical issues
- ✅ All tests pass
- ✅ Architecture principles followed
- ✅ Code is maintainable and readable

**Request changes if**:
- ❌ Critical or important issues present
- ❌ Tests failing
- ❌ Architecture violations
- ❌ Security concerns

**Comment only if**:
- 💡 Minor suggestions
- 💡 Learning opportunities
- 💡 Future improvements

---

**Remember**: Code review is about collaboration, not criticism. Be constructive and helpful!
