# Pre-Commit Checklist

Use this checklist before committing code to ensure Clean Architecture compliance.

## Architecture Compliance

### Dependency Direction
- [ ] Domain layer has NO imports from Application or Infrastructure
- [ ] Application layer ONLY imports from Domain
- [ ] Infrastructure layer can import from Domain and Application
- [ ] No circular dependencies between layers

### Core Code Independence
- [ ] Domain entities can be instantiated without framework
- [ ] Domain logic works without database
- [ ] Application handlers can be tested with fake repositories
- [ ] No direct database calls in Domain or Application layers

## Domain Layer

### Entities
- [ ] Constructor validates all required fields
- [ ] Invalid data throws exceptions
- [ ] Properties are private/protected
- [ ] Only getters exposed (no public setters)
- [ ] Business logic methods are present
- [ ] No framework dependencies (annotations, traits, etc.)

### Value Objects
- [ ] Immutable (no setters)
- [ ] Validates in constructor
- [ ] Implements equals() method
- [ ] No unique identifier
- [ ] Self-contained validation logic

### Repository Interfaces
- [ ] Defined in domain layer (not infrastructure)
- [ ] Methods accept/return domain entities
- [ ] No database-specific details in interface
- [ ] Clear, business-oriented method names

## Application Layer

### Commands/Queries
- [ ] Immutable DTOs (readonly properties)
- [ ] No business logic
- [ ] Simple data containers
- [ ] Represent user intentions clearly

### Handlers
- [ ] Dependencies injected via constructor
- [ ] Uses repository interfaces (not implementations)
- [ ] Orchestrates domain logic (doesn't contain it)
- [ ] Returns simple types or view models
- [ ] No direct database access

### Application Services
- [ ] Coordinates multiple handlers if needed
- [ ] Uses application ports for external services
- [ ] No business logic (delegates to domain)

## Infrastructure Layer

### Controllers
- [ ] Only handles HTTP concerns
- [ ] Validates request format (not business rules)
- [ ] Creates commands/queries from request
- [ ] Calls application handlers
- [ ] Returns HTTP responses
- [ ] NO business logic in controllers
- [ ] NO direct repository calls

### Repository Implementations
- [ ] Implements domain repository interface
- [ ] Maps between database models and domain entities
- [ ] Returns domain entities (not ORM models)
- [ ] Handles database-specific operations
- [ ] No business logic in repositories

### External Adapters
- [ ] Implements application port interfaces
- [ ] Contains all third-party integration code
- [ ] Isolated from domain logic

## Dependency Injection

- [ ] Dependencies injected via constructor
- [ ] Type-hint interfaces, not concrete classes
- [ ] No service locator pattern
- [ ] No static method calls in domain/application
- [ ] No global state or singletons in core code
- [ ] DI container properly configured

## Testing

### Unit Tests
- [ ] Domain entities have unit tests
- [ ] Application handlers tested with fakes
- [ ] Tests run without database
- [ ] Tests run without HTTP server
- [ ] Test coverage ≥ 80% for domain and application

### Integration Tests
- [ ] Repositories tested with real database
- [ ] External adapters tested with real services (or mocks)
- [ ] Tests use RefreshDatabase or similar

### Test Quality
- [ ] Tests are readable and maintainable
- [ ] One assertion per test (generally)
- [ ] Descriptive test names
- [ ] Arrange-Act-Assert pattern followed

## Code Quality

### General
- [ ] Code follows PSR-12 (PHP) or language standards
- [ ] No commented-out code
- [ ] No debug statements (var_dump, console.log, etc.)
- [ ] Meaningful variable and method names
- [ ] Proper error handling

### Documentation
- [ ] Public methods have docblocks
- [ ] Complex logic has explanatory comments
- [ ] README updated if needed

## Security

- [ ] No sensitive data in code (API keys, passwords)
- [ ] Input validation present
- [ ] SQL injection prevented (using parameterized queries)
- [ ] XSS prevention in place

## Performance

- [ ] No N+1 query problems
- [ ] Appropriate database indexes
- [ ] No unnecessary database queries
- [ ] Efficient algorithms used

## Git

- [ ] Commit message is descriptive
- [ ] Commits are atomic (one logical change)
- [ ] No merge conflicts
- [ ] Branch is up to date with main/master

## Quick Validation Commands

```bash
# Check domain dependencies
grep -r "use.*Infrastructure\|use.*Illuminate" src/domain/

# Check application dependencies
grep -r "use.*Infrastructure" src/application/

# Check for direct DB access in core
grep -r "DB::\|Eloquent" src/domain/ src/application/

# Run tests
php artisan test

# Check code style
./vendor/bin/phpcs

# Static analysis
./vendor/bin/phpstan analyse
```

## Before Pushing

- [ ] All tests pass
- [ ] Code style checks pass
- [ ] Static analysis passes
- [ ] No merge conflicts
- [ ] Branch builds successfully in CI

---

**If you checked all boxes, you're ready to commit! 🎉**

**If any box is unchecked, fix the issue before committing.**
