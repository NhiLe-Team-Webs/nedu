# Step-by-Step Refactoring Guide

## Overview

This guide provides a detailed, step-by-step process for refactoring legacy code to Clean Architecture. Follow these steps in order for a safe, incremental migration.

## Phase 1: Preparation (Week 1)

### Step 1.1: Analyze Current Codebase

**Goal**: Understand what you have

**Actions**:
1. Map out current architecture
2. Identify business logic locations
3. List all external dependencies
4. Document pain points

**Checklist**:
- [ ] Created architecture diagram
- [ ] Listed all controllers
- [ ] Listed all models/entities
- [ ] Listed all services
- [ ] Identified database access points
- [ ] Documented external APIs used

### Step 1.2: Setup New Directory Structure

**Goal**: Create foundation for clean architecture

**Actions**:
```bash
mkdir -p src/domain
mkdir -p src/application
mkdir -p src/infrastructure
```

**Directory structure**:
```
src/
├── domain/
│   └── {context}/
│       ├── entities/
│       ├── value-objects/
│       ├── repositories/
│       └── services/
├── application/
│   └── {context}/
│       ├── commands/
│       ├── queries/
│       ├── handlers/
│       └── view-models/
└── infrastructure/
    ├── persistence/
    ├── web/
    └── external/
```

**Checklist**:
- [ ] Created directory structure
- [ ] Configured autoloading
- [ ] Updated composer.json (or equivalent)
- [ ] Ran `composer dump-autoload`

### Step 1.3: Choose First Feature to Migrate

**Goal**: Start with a small, isolated feature

**Criteria for first feature**:
- ✅ Small and self-contained
- ✅ Few dependencies
- ✅ High business value
- ✅ Good test coverage (or easy to test)

**Examples of good first features**:
- User registration
- Simple CRUD operation
- Password reset
- Email verification

**Checklist**:
- [ ] Selected first feature
- [ ] Documented current implementation
- [ ] Identified all dependencies
- [ ] Created migration plan

## Phase 2: Extract Domain Layer (Week 2)

### Step 2.1: Create Value Objects

**Goal**: Replace primitives with value objects

**Before**:
```php
class User {
    public string $email;
    public string $password;
}
```

**After**:
```php
// src/domain/user/value-objects/Email.php
final class Email {
    private string $value;
    
    public function __construct(string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email');
        }
        $this->value = strtolower($value);
    }
    
    public function getValue(): string {
        return $this->value;
    }
}

// src/domain/user/value-objects/HashedPassword.php
final class HashedPassword {
    private string $value;
    
    public function __construct(string $plainPassword) {
        $this->value = password_hash($plainPassword, PASSWORD_BCRYPT);
    }
    
    public function getValue(): string {
        return $this->value;
    }
    
    public function verify(string $plainPassword): bool {
        return password_verify($plainPassword, $this->value);
    }
}
```

**Checklist**:
- [ ] Identified all primitives to replace
- [ ] Created value object for each
- [ ] Added validation logic
- [ ] Wrote unit tests for value objects

### Step 2.2: Create Domain Entity

**Goal**: Move business logic into entity

**Before (Anemic)**:
```php
class User extends Model {
    protected $fillable = ['email', 'password', 'status'];
}

class UserService {
    public function register($email, $password) {
        $user = new User();
        $user->email = $email;
        $user->password = bcrypt($password);
        $user->status = 'pending';
        $user->save();
    }
}
```

**After (Rich Domain)**:
```php
// src/domain/user/entities/User.php
class User {
    private UserId $id;
    private Email $email;
    private HashedPassword $password;
    private UserStatus $status;
    
    private function __construct(
        UserId $id,
        Email $email,
        HashedPassword $password
    ) {
        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
        $this->status = UserStatus::PENDING;
    }
    
    public static function register(
        UserId $id,
        Email $email,
        string $plainPassword
    ): self {
        return new self(
            $id,
            $email,
            new HashedPassword($plainPassword)
        );
    }
    
    public function activate(): void {
        if ($this->status !== UserStatus::PENDING) {
            throw new \DomainException('User already activated');
        }
        $this->status = UserStatus::ACTIVE;
    }
    
    // Getters...
}
```

**Checklist**:
- [ ] Created domain entity
- [ ] Moved business logic to entity
- [ ] Made entity self-validating
- [ ] Wrote unit tests for entity

### Step 2.3: Create Repository Interface

**Goal**: Define data access contract in domain

**Create interface**:
```php
// src/domain/user/repositories/UserRepository.php
namespace App\Domain\User\Repositories;

interface UserRepository {
    public function save(User $user): void;
    public function getById(UserId $id): User;
    public function findByEmail(Email $email): ?User;
    public function delete(UserId $id): void;
}
```

**Checklist**:
- [ ] Created repository interface in domain
- [ ] Defined all required methods
- [ ] Used domain types (not primitives)
- [ ] Documented exceptions

## Phase 3: Create Application Layer (Week 3)

### Step 3.1: Create Commands

**Goal**: Define use case inputs

```php
// src/application/user/commands/RegisterUserCommand.php
final class RegisterUserCommand {
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) {}
}
```

**Checklist**:
- [ ] Created command for each use case
- [ ] Made commands immutable
- [ ] Used simple types (primitives)

### Step 3.2: Create Handlers

**Goal**: Implement use case logic

```php
// src/application/user/handlers/RegisterUserHandler.php
final class RegisterUserHandler {
    public function __construct(
        private UserRepository $userRepo
    ) {}
    
    public function handle(RegisterUserCommand $command): int {
        // Check if email exists
        $existing = $this->userRepo->findByEmail(new Email($command->email));
        if ($existing) {
            throw new \DomainException('Email already registered');
        }
        
        // Create user
        $user = User::register(
            UserId::generate(),
            new Email($command->email),
            $command->password
        );
        
        // Save
        $this->userRepo->save($user);
        
        return $user->getId()->getValue();
    }
}
```

**Checklist**:
- [ ] Created handler for each command
- [ ] Injected dependencies via constructor
- [ ] Delegated business logic to domain
- [ ] Wrote unit tests with fakes

## Phase 4: Implement Infrastructure (Week 4)

### Step 4.1: Implement Repository

**Goal**: Implement data access

```php
// src/infrastructure/persistence/EloquentUserRepository.php
final class EloquentUserRepository implements UserRepository {
    public function save(User $user): void {
        UserModel::updateOrCreate(
            ['id' => $user->getId()->getValue()],
            [
                'email' => $user->getEmail()->getValue(),
                'password' => $user->getPassword()->getValue(),
                'status' => $user->getStatus()->value
            ]
        );
    }
    
    public function getById(UserId $id): User {
        $model = UserModel::findOrFail($id->getValue());
        return $this->mapToEntity($model);
    }
    
    private function mapToEntity(UserModel $model): User {
        // Use reflection to reconstruct entity
        // (implementation details omitted for brevity)
    }
}
```

**Checklist**:
- [ ] Implemented repository interface
- [ ] Mapped between DB and domain entities
- [ ] Wrote integration tests

### Step 4.2: Update Controller

**Goal**: Make controller thin

**Before**:
```php
class UserController {
    public function register(Request $request) {
        $user = new User();
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        
        Mail::to($user->email)->send(new Welcome());
        
        return response()->json(['id' => $user->id]);
    }
}
```

**After**:
```php
// src/infrastructure/web/controllers/UserController.php
final class UserController {
    public function __construct(
        private RegisterUserHandler $handler
    ) {}
    
    public function register(Request $request): JsonResponse {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        
        $command = new RegisterUserCommand(
            email: $validated['email'],
            password: $validated['password']
        );
        
        try {
            $userId = $this->handler->handle($command);
            return response()->json(['id' => $userId], 201);
        } catch (\DomainException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
```

**Checklist**:
- [ ] Updated controller to use handler
- [ ] Removed business logic
- [ ] Added proper error handling
- [ ] Wrote feature tests

### Step 4.3: Configure Dependency Injection

**Goal**: Wire everything together

```php
// app/Providers/AppServiceProvider.php
public function register(): void {
    $this->app->bind(UserRepository::class, EloquentUserRepository::class);
    $this->app->singleton(RegisterUserHandler::class);
}
```

**Checklist**:
- [ ] Configured DI container
- [ ] Bound all interfaces
- [ ] Tested dependency resolution

## Phase 5: Testing & Deployment (Week 5)

### Step 5.1: Write Tests

**Unit Tests**:
```php
class UserTest extends TestCase {
    public function test_registers_user_with_valid_data() {
        $user = User::register(
            new UserId(1),
            new Email('test@example.com'),
            'password123'
        );
        
        $this->assertEquals('test@example.com', $user->getEmail()->getValue());
        $this->assertEquals(UserStatus::PENDING, $user->getStatus());
    }
}
```

**Integration Tests**:
```php
class EloquentUserRepositoryTest extends TestCase {
    use RefreshDatabase;
    
    public function test_saves_and_retrieves_user() {
        $user = User::register(...);
        $this->repo->save($user);
        
        $retrieved = $this->repo->getById($user->getId());
        
        $this->assertEquals($user->getEmail()->getValue(), 
                           $retrieved->getEmail()->getValue());
    }
}
```

**Feature Tests**:
```php
class UserRegistrationTest extends TestCase {
    public function test_user_can_register() {
        $response = $this->postJson('/api/register', [
            'email' => 'test@example.com',
            'password' => 'password123'
        ]);
        
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }
}
```

**Checklist**:
- [ ] Unit tests for domain (≥90% coverage)
- [ ] Integration tests for repositories
- [ ] Feature tests for endpoints
- [ ] All tests passing

### Step 5.2: Deploy with Feature Flag

**Goal**: Safe deployment

```php
class UserController {
    public function register(Request $request) {
        if (config('features.clean_architecture_users')) {
            return $this->registerWithCleanArchitecture($request);
        }
        return $this->registerLegacy($request);
    }
}
```

**Checklist**:
- [ ] Added feature flag
- [ ] Deployed to staging
- [ ] Tested both paths
- [ ] Monitored performance
- [ ] Deployed to production
- [ ] Enabled feature flag gradually

### Step 5.3: Remove Legacy Code

**Goal**: Clean up

**Actions**:
1. Remove feature flag
2. Delete old code
3. Update documentation
4. Celebrate! 🎉

**Checklist**:
- [ ] Feature flag removed
- [ ] Legacy code deleted
- [ ] Documentation updated
- [ ] Team trained on new architecture

## Phase 6: Repeat for Next Feature

**Goal**: Continue migration

**Process**:
1. Choose next feature (slightly more complex)
2. Repeat phases 2-5
3. Learn from previous iteration
4. Improve process

**Checklist**:
- [ ] Selected next feature
- [ ] Applied lessons learned
- [ ] Continued migration

## Timeline Summary

| Week | Phase | Focus |
|------|-------|-------|
| 1 | Preparation | Setup & Planning |
| 2 | Domain | Entities & Value Objects |
| 3 | Application | Commands & Handlers |
| 4 | Infrastructure | Repositories & Controllers |
| 5 | Testing | Tests & Deployment |
| 6+ | Iteration | Next Features |

## Success Metrics

Track these metrics:

- [ ] Features migrated: __/__ (target: 100%)
- [ ] Test coverage: __% (target: ≥80%)
- [ ] Code in domain layer: __% (target: ≥40%)
- [ ] Business logic in controllers: __% (target: 0%)
- [ ] Direct DB access in domain/app: __% (target: 0%)

## Common Pitfalls to Avoid

1. ❌ Trying to migrate everything at once
2. ❌ Skipping tests
3. ❌ Not using feature flags
4. ❌ Ignoring team feedback
5. ❌ Perfectionism (done is better than perfect)

## Tips for Success

1. ✅ Start small
2. ✅ Test everything
3. ✅ Deploy frequently
4. ✅ Get team buy-in
5. ✅ Document as you go
6. ✅ Celebrate wins

---

**Remember**: Migration is a marathon, not a sprint. Take it one feature at a time!
