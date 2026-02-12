SOP: KIẾN TRÚC ỨNG DỤNG WEB
Standard Operating Procedure for Development Team
Version: 1.0
 Effective Date: [Date]
 Review Cycle: Quarterly

1. MỤC ĐÍCH VÀ PHẠM VI
1.1 Mục đích
Thiết lập tiêu chuẩn kiến trúc cho mọi dự án web
Đảm bảo tách biệt rõ ràng Core Code và Infrastructure Code
Tăng khả năng bảo trì, kiểm thử và mở rộng hệ thống
Áp dụng Domain-Driven Design và Clean Architecture
1.2 Phạm vi áp dụng
Tất cả dự án web mới (bất kể ngôn ngữ: Java, C#, Node.js, Python, PHP, Go, Ruby...)
Refactor các dự án legacy hiện tại
Áp dụng cho toàn bộ team Backend Development

2. ĐỊNH NGHĨA CỐT LÕI
2.1 Core Code (Code Lõi)
Định nghĩa: Code chạy được trong mọi context, không phụ thuộc hệ thống bên ngoài.
Quy tắc bắt buộc:
❌ KHÔNG ĐƯỢC PHÉP
✅ BẮT BUỘC
Database operations
Chạy hoàn toàn trong memory
HTTP/API calls
Không cần môi trường đặc biệt
File I/O
Testable mà không cần setup
Framework-specific code
Framework-agnostic
System clock/timezone
Pure business logic

Ví dụ minh họa:
// ✅ ĐÚNG - Core Code
class Order {
  constructor(id, email, quantity, pricePerUnit) {
    if (quantity <= 0) throw new Error('Invalid quantity');
    if (!this.isValidEmail(email)) throw new Error('Invalid email');
    
    this.id = id;
    this.email = email;
    this.quantity = quantity;
    this.totalAmount = quantity * pricePerUnit;
  }
  
  calculateTotal() {
    return this.quantity * this.pricePerUnit;
  }
}

// ❌ SAI - Infrastructure Code lẫn vào Core
class Order {
  save() {
    database.insert('orders', this); // Phụ thuộc database!
  }
}

2.2 Infrastructure Code (Code Hạ tầng)
Định nghĩa: Code kết nối ứng dụng với hệ thống bên ngoài.
Bao gồm:
Database access (ORM, Query builders, SQL)
HTTP clients, REST/GraphQL APIs
File system operations
Framework components (Controllers, Middleware, Routes)
External integrations (Email, Payment, SMS, Cloud services)
Message queues, Event buses
Logging, Monitoring, Caching

3. KIẾN TRÚC PHÂN LỚP (LAYERED ARCHITECTURE)
3.1 Cấu trúc 3 tầng bắt buộc
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

3.2 Quy tắc phụ thuộc (NGHIÊM NGẶT)
Infrastructure → Application → Domain

Nguyên tắc:
Domain KHÔNG phụ thuộc bất kỳ tầng nào
Application chỉ phụ thuộc Domain
Infrastructure phụ thuộc cả Application và Domain
Luồng phụ thuộc LUÔN hướng vào trong (inward)
3.3 Cấu trúc thư mục khuyến nghị
src/
├── domain/                    # Domain Layer
│   └── [context]/
│       ├── entities/          # Domain Entities
│       ├── value-objects/     # Value Objects
│       ├── repositories/      # Repository Interfaces (Ports)
│       ├── services/          # Domain Services
│       └── events/            # Domain Events
│
├── application/               # Application Layer
│   └── [context]/
│       ├── commands/          # Command DTOs
│       ├── queries/           # Query DTOs
│       ├── handlers/          # Use Case Handlers
│       └── ports/             # Application Ports
│
└── infrastructure/            # Infrastructure Layer
    ├── persistence/           # Database implementations
    ├── web/                   # HTTP Controllers, Routes
    ├── messaging/             # Message queue adapters
    ├── external/              # Third-party integrations
    └── config/                # Framework configuration


4. DOMAIN MODEL PATTERN
4.1 Entity - Thiết kế chuẩn
Nguyên tắc thiết kế:
Yêu cầu
Mô tả
Constructor validation
Validate TẤT CẢ dữ liệu, throw exception nếu invalid
Immutable properties
Properties private/protected, chỉ getter
Self-contained logic
Tất cả business logic nằm trong Entity
No infrastructure
Không gọi DB, API, file system

Template (Language-agnostic pseudocode):
class Order {
  private id: string;
  private email: string;
  private quantity: number;
  private totalAmount: number;
  
  constructor(id: string, email: string, quantity: number, pricePerUnit: number) {
    // Validation - BẮT BUỘC
    if (quantity <= 0) {
      throw new InvalidArgumentError('Quantity must be positive');
    }
    if (!isValidEmail(email)) {
      throw new InvalidArgumentError('Invalid email format');
    }
    
    this.id = id;
    this.email = email;
    this.quantity = quantity;
    this.totalAmount = quantity * pricePerUnit; // Tự tính toán
  }
  
  // Getters only - NO setters
  getTotalAmount(): number {
    return this.totalAmount;
  }
  
  // Business methods
  applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new InvalidArgumentError('Invalid discount');
    }
    this.totalAmount = this.totalAmount * (1 - percentage / 100);
  }
}

4.2 Value Objects
Khi nào sử dụng:
Dữ liệu không có identity (Email, Money, Address, DateRange)
Cần đảm bảo tính bất biến (immutable)
Cần encapsulate validation logic
Template:
public final class EmailAddress {
    private final String value;
    
    public EmailAddress(String email) {
        if (!isValid(email)) {
            throw new IllegalArgumentException("Invalid email");
        }
        this.value = email;
    }
    
    public String getValue() {
        return value;
    }
    
    public boolean equals(EmailAddress other) {
        return this.value.equals(other.value);
    }
    
    private boolean isValid(String email) {
        // Email validation logic
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}


5. REPOSITORY PATTERN
5.1 Repository Interface (Domain Layer)
Quy tắc:
Đặt trong domain/[context]/repositories/
Chỉ định nghĩa contract, KHÔNG implement
Tên method rõ ràng, hướng nghiệp vụ
Trả về Domain Entity, KHÔNG trả về DTO/Model của ORM
Template:
// Domain/Order/Repositories/IOrderRepository.cs
public interface IOrderRepository
{
    Order Save(Order order);
    Order GetById(string orderId);
    List<Order> FindByCustomerId(string customerId);
    void Delete(string orderId);
}

5.2 Repository Implementation (Infrastructure Layer)
Quy tắc:
Đặt trong infrastructure/persistence/
Tên: [Technology][Entity]Repository
Chứa TẤT CẢ logic database/storage
Chuyển đổi: ORM Model ↔ Domain Entity
Template (Python + SQLAlchemy example):
# infrastructure/persistence/sqlalchemy_order_repository.py
class SqlAlchemyOrderRepository(IOrderRepository):
    def __init__(self, session):
        self.session = session
    
    def save(self, order: Order) -> Order:
        # Convert Domain Entity -> ORM Model
        order_model = OrderModel(
            id=order.id,
            email=order.email,
            quantity=order.quantity,
            total_amount=order.total_amount
        )
        
        self.session.add(order_model)
        self.session.commit()
        return order
    
    def get_by_id(self, order_id: str) -> Order:
        order_model = self.session.query(OrderModel).filter_by(id=order_id).first()
        
        if not order_model:
            raise OrderNotFoundException(f"Order {order_id} not found")
        
        # Convert ORM Model -> Domain Entity
        return Order(
            id=order_model.id,
            email=order_model.email,
            quantity=order_model.quantity,
            price_per_unit=order_model.total_amount / order_model.quantity
        )


6. APPLICATION SERVICES & COMMAND PATTERN
6.1 Command/Query Objects (DTO)
Quy tắc:
Đặt trong application/[context]/commands/ hoặc queries/
Tên: [Action]Command hoặc [Action]Query
Chỉ chứa data, KHÔNG chứa logic
Immutable (readonly/final properties)
Template (C#):
// Application/Order/Commands/PlaceOrderCommand.cs
public sealed class PlaceOrderCommand
{
    public PlaceOrderCommand(string ebookId, string email, int quantity)
    {
        EbookId = ebookId;
        Email = email;
        Quantity = quantity;
    }
    
    public string EbookId { get; }
    public string Email { get; }
    public int Quantity { get; }
}

6.2 Application Service/Handler
Quy tắc:
Đặt trong application/[context]/handlers/
Tên: [Action]Handler hoặc [Context]Service
Inject dependencies qua constructor (DI)
Method chính: handle(Command) hoặc execute(Command)
KHÔNG chứa business logic chi tiết (đẩy vào Domain)
Template (Node.js/TypeScript):
// application/order/handlers/PlaceOrderHandler.ts
export class PlaceOrderHandler {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly ebookRepository: IEbookRepository,
    private readonly idGenerator: IIdGenerator
  ) {}
  
  async handle(command: PlaceOrderCommand): Promise<string> {
    // 1. Lấy dữ liệu từ repository
    const ebook = await this.ebookRepository.getById(command.ebookId);
    
    // 2. Tạo Domain Entity (validation tự động)
    const order = new Order(
      this.idGenerator.generate(),
      command.email,
      command.quantity,
      ebook.price
    );
    
    // 3. Lưu qua repository
    await this.orderRepository.save(order);
    
    // 4. Publish domain events (optional)
    // await this.eventBus.publish(new OrderPlacedEvent(order));
    
    return order.id;
  }
}


7. CONTROLLER (Infrastructure Layer)
7.1 Trách nhiệm Controller
Controller CHỈ được phép:
✅ Nhận HTTP Request
✅ Validate request format (không phải business rules)
✅ Tạo Command/Query từ request
✅ Gọi Application Handler
✅ Trả về HTTP Response
Controller KHÔNG được phép:
❌ Chứa business logic
❌ Truy cập Database trực tiếp
❌ Gọi Repository
❌ Thực hiện tính toán nghiệp vụ
Template (Java Spring Boot):
// infrastructure/web/OrderController.java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final PlaceOrderHandler placeOrderHandler;
    
    @Autowired
    public OrderController(PlaceOrderHandler placeOrderHandler) {
        this.placeOrderHandler = placeOrderHandler;
    }
    
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody @Valid PlaceOrderRequest request) {
        // 1. Tạo Command
        PlaceOrderCommand command = new PlaceOrderCommand(
            request.getEbookId(),
            request.getEmail(),
            request.getQuantity()
        );
        
        // 2. Gọi Handler
        try {
            String orderId = placeOrderHandler.handle(command);
            
            // 3. Trả response
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new OrderResponse(orderId, "Order placed successfully"));
                
        } catch (InvalidArgumentException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        }
    }
}


8. DEPENDENCY INJECTION
8.1 Nguyên tắc DI
BẮT BUỘC:
✅ Inject qua Constructor
✅ Inject Interface, KHÔNG inject concrete class
✅ Type-hint rõ ràng
✅ Sử dụng DI Container của framework
TRÁNH:
❌ Service Locator pattern
❌ Static method calls trong Domain/Application
❌ Global state/Singleton pattern
8.2 Cấu hình DI Container
Template (Python FastAPI + Dependency Injector):
# infrastructure/config/container.py
from dependency_injector import containers, providers

class Container(containers.DeclarativeContainer):
    # Database
    db_session = providers.Singleton(create_db_session)
    
    # Repositories
    order_repository = providers.Factory(
        SqlAlchemyOrderRepository,
        session=db_session
    )
    
    ebook_repository = providers.Factory(
        SqlAlchemyEbookRepository,
        session=db_session
    )
    
    # Handlers
    place_order_handler = providers.Factory(
        PlaceOrderHandler,
        order_repository=order_repository,
        ebook_repository=ebook_repository
    )


9. READ MODEL & VIEW MODEL
9.1 Nguyên tắc phân tách
Write Model (Entity):
Dùng cho operations thay đổi state
Chứa business logic đầy đủ
Validate và enforce invariants
Read Model:
Dùng RIÊNG cho queries/hiển thị
Tối ưu cho performance
Không có business logic
View Model:
DTO cho presentation layer
Format dữ liệu sẵn sàng cho UI/API
Chứa computed fields nếu cần
9.2 Template
// application/order/queries/OrderListViewModel.go
type OrderListViewModel struct {
    OrderID        string  `json:"orderId"`
    CustomerName   string  `json:"customerName"`
    FormattedTotal string  `json:"total"`
    OrderDate      string  `json:"orderDate"`
}

// infrastructure/persistence/OrderReadRepository.go
type OrderReadRepository struct {
    db *sql.DB
}

func (r *OrderReadRepository) FindRecentOrders(limit int) ([]OrderListViewModel, error) {
    query := `
        SELECT o.id, c.name, o.total_amount, o.created_at
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        ORDER BY o.created_at DESC
        LIMIT ?
    `
    
    rows, err := r.db.Query(query, limit)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    
    var viewModels []OrderListViewModel
    for rows.Next() {
        var vm OrderListViewModel
        var totalAmount float64
        
        err := rows.Scan(&vm.OrderID, &vm.CustomerName, &totalAmount, &vm.OrderDate)
        if err != nil {
            return nil, err
        }
        
        vm.FormattedTotal = fmt.Sprintf("$%.2f", totalAmount)
        viewModels = append(viewModels, vm)
    }
    
    return viewModels, nil
}


10. HEXAGONAL ARCHITECTURE (PORTS & ADAPTERS)
10.1 Ports (Interfaces)
Output Ports (Domain → Infrastructure):
# domain/order/repositories/order_repository.rb
module Domain
  module Order
    module Repositories
      class OrderRepository
        def save(order)
          raise NotImplementedError
        end
        
        def find_by_id(order_id)
          raise NotImplementedError
        end
      end
    end
  end
end

Input Ports (Infrastructure → Application):
# application/order/ports/order_notification.rb
module Application
  module Order
    module Ports
      class OrderNotification
        def send_confirmation(order)
          raise NotImplementedError
        end
      end
    end
  end
end

10.2 Adapters (Implementations)
Persistence Adapter:
# infrastructure/persistence/postgres_order_repository.rb
class PostgresOrderRepository < Domain::Order::Repositories::OrderRepository
  def initialize(connection)
    @connection = connection
  end
  
  def save(order)
    @connection.exec_params(
      'INSERT INTO orders (id, email, quantity, total_amount) VALUES ($1, $2, $3, $4)',
      [order.id, order.email, order.quantity, order.total_amount]
    )
    order
  end
  
  def find_by_id(order_id)
    result = @connection.exec_params('SELECT * FROM orders WHERE id = $1', [order_id])
    
    raise OrderNotFoundError if result.ntuples.zero?
    
    row = result[0]
    Domain::Order::Order.new(
      row['id'],
      row['email'],
      row['quantity'].to_i,
      row['total_amount'].to_f / row['quantity'].to_i
    )
  end
end

Notification Adapter:
# infrastructure/notifications/email_order_notification.rb
class EmailOrderNotification < Application::Order::Ports::OrderNotification
  def initialize(mailer)
    @mailer = mailer
  end
  
  def send_confirmation(order)
    @mailer.send(
      to: order.email,
      subject: 'Order Confirmation',
      body: "Your order #{order.id} has been placed successfully."
    )
  end
end

10.3 Test Adapters (Fake Implementations)
In-Memory Repository (for testing):
# tests/fakes/in_memory_order_repository.py
class InMemoryOrderRepository(IOrderRepository):
    def __init__(self):
        self._orders = {}
        self._next_id = 1
    
    def save(self, order: Order) -> Order:
        order_id = str(self._next_id)
        self._next_id += 1
        self._orders[order_id] = order
        return order
    
    def get_by_id(self, order_id: str) -> Order:
        if order_id not in self._orders:
            raise OrderNotFoundException()
        return self._orders[order_id]
    
    def clear(self):
        """Helper method for tests"""
        self._orders.clear()
        self._next_id = 1


11. TESTING STRATEGY
11.1 Test Pyramid
                   /\
                   /E2E\      ← Ít (UI, Full integration)
                  /------\
                 /        \
                /Integration\ ← Vừa (Repositories, Adapters)
               /------------\
              /              \
             /  Unit Tests    \ ← Nhiều nhất (Domain, Application)
            /------------------\

Phân bổ khuyến nghị:
Unit Tests: 70%
Integration Tests: 20%
E2E Tests: 10%
11.2 Unit Tests (Domain & Application)
Mục tiêu:
Test Domain Entities, Value Objects
Test Application Handlers với Fake Repositories
Chạy NHANH, KHÔNG cần database/external services
Code coverage >= 80%
Template (JavaScript/Jest):
// tests/unit/domain/order.test.js
describe('Order Entity', () => {
  test('should calculate total correctly', () => {
    const order = new Order('1', 'test@example.com', 3, 100);
    
    expect(order.getTotalAmount()).toBe(300);
  });
  
  test('should throw error for invalid email', () => {
    expect(() => {
      new Order('1', 'invalid-email', 1, 100);
    }).toThrow('Invalid email format');
  });
  
  test('should throw error for zero quantity', () => {
    expect(() => {
      new Order('1', 'test@example.com', 0, 100);
    }).toThrow('Quantity must be positive');
  });
});

// tests/unit/application/place-order-handler.test.js
describe('PlaceOrderHandler', () => {
  let handler;
  let fakeOrderRepo;
  let fakeEbookRepo;
  
  beforeEach(() => {
    fakeOrderRepo = new InMemoryOrderRepository();
    fakeEbookRepo = new InMemoryEbookRepository();
    handler = new PlaceOrderHandler(fakeOrderRepo, fakeEbookRepo);
  });
  
  test('should place order successfully', async () => {
    const command = new PlaceOrderCommand('ebook-1', 'test@example.com', 2);
    
    const orderId = await handler.handle(command);
    
    expect(orderId).toBeDefined();
    const savedOrder = await fakeOrderRepo.getById(orderId);
    expect(savedOrder.email).toBe('test@example.com');
    expect(savedOrder.quantity).toBe(2);
  });
});

11.3 Integration Tests (Infrastructure)
Mục tiêu:
Test Repository với database thực
Test External adapters
Test Controllers với Application layer
Template (C# xUnit + TestContainers):
// tests/integration/SqlServerOrderRepositoryTests.cs
public class SqlServerOrderRepositoryTests : IDisposable
{
    private readonly SqlServerContainer _container;
    private readonly SqlServerOrderRepository _repository;
    
    public SqlServerOrderRepositoryTests()
    {
        _container = new SqlServerBuilder().Build();
        _container.StartAsync().Wait();
        
        var connectionString = _container.GetConnectionString();
        _repository = new SqlServerOrderRepository(connectionString);
    }
    
    [Fact]
    public async Task Should_Save_And_Retrieve_Order()
    {
        // Arrange
        var order = new Order("1", "test@example.com", 2, 50.0m);
        
        // Act
        await _repository.Save(order);
        var retrieved = await _repository.GetById("1");
        
        // Assert
        Assert.Equal("test@example.com", retrieved.Email);
        Assert.Equal(100.0m, retrieved.TotalAmount);
    }
    
    public void Dispose()
    {
        _container.StopAsync().Wait();
        _container.DisposeAsync().AsTask().Wait();
    }
}


12. CHECKLIST TRƯỚC KHI COMMIT
12.1 Architecture Compliance
[ ] Code đặt đúng tầng (Domain/Application/Infrastructure)?
[ ] Core Code KHÔNG phụ thuộc Infrastructure?
[ ] Interfaces trong Domain/Application, Implementations trong Infrastructure?
[ ] Dependency direction đúng (Infrastructure → Application → Domain)?
12.2 Domain Model
[ ] Entity có validation trong constructor?
[ ] Properties là private/protected?
[ ] Business logic nằm trong Domain, KHÔNG trong Controller?
[ ] Value Objects được sử dụng thay primitive types khi phù hợp?
12.3 Repository
[ ] Repository interface trong Domain?
[ ] Repository implementation trong Infrastructure?
[ ] KHÔNG có database operations trong Domain/Application?
[ ] Entity được map từ ORM model, KHÔNG expose ORM trực tiếp?
12.4 Application Service
[ ] Handler chỉ orchestrate, KHÔNG chứa business logic?
[ ] Dependencies inject qua constructor?
[ ] Command/Query DTO được sử dụng?
[ ] KHÔNG gọi Repository từ Controller trực tiếp?
12.5 Controller
[ ] Controller chỉ xử lý HTTP concerns?
[ ] KHÔNG có business logic trong Controller?
[ ] Gọi Application Handler, không gọi Repository?
[ ] Error handling phù hợp với HTTP semantics?
12.6 Testing
[ ] Unit tests cho Domain entities?
[ ] Unit tests cho Application handlers (với fake repos)?
[ ] Integration tests cho Repository implementations?
[ ] Test coverage >= 80% cho Domain & Application?

13. COMMON MISTAKES & SOLUTIONS
❌ Mistake 1: Business logic trong Controller
# SAI
@app.post("/orders")
def create_order(request: Request):
    price = db.query("SELECT price FROM ebooks WHERE id = ?", request.ebook_id)
    total = request.quantity * price
    db.insert("INSERT INTO orders ...", total)

# ĐÚNG
@app.post("/orders")
def create_order(request: Request):
    command = PlaceOrderCommand(request.ebook_id, request.email, request.quantity)
    order_id = place_order_handler.handle(command)
    return {"order_id": order_id}

❌ Mistake 2: Domain phụ thuộc Framework
// SAI - Domain Entity phụ thuộc JPA
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    
    @Column
    private String email;
    
    // JPA annotations trong Domain!
}

// ĐÚNG - Pure Domain Entity
public class Order {
    private final String id;
    private final String email;
    private final int quantity;
    
    public Order(String id, String email, int quantity, Money price) {
        // Validation & business logic
    }
}

// Riêng biệt: JPA Entity trong Infrastructure
@Entity
@Table(name = "orders")
class OrderJpaEntity {
    @Id
    private String id;
    // Mapping fields
}

❌ Mistake 3: Dùng Write Model cho Read
// SAI
public IActionResult GetOrders()
{
    var orders = _orderRepository.GetAll(); // Load full entities
    return View(orders); // Expose domain entities to view
}

// ĐÚNG
public IActionResult GetOrders()
{
    var viewModels = _orderReadService.GetRecentOrders(20);
    return View(viewModels); // Use specialized read model
}

❌ Mistake 4: Service Locator thay vì DI
// SAI
class PlaceOrderHandler {
  handle(command) {
    const orderRepo = ServiceLocator.get('OrderRepository'); // Anti-pattern!
    // ...
  }
}

// ĐÚNG
class PlaceOrderHandler {
  constructor(orderRepository, ebookRepository) {
    this.orderRepository = orderRepository;
    this.ebookRepository = ebookRepository;
  }
  
  handle(command) {
    // Use injected dependencies
  }
}


14. CODE REVIEW GUIDELINES
14.1 Reviewer Checklist
Architecture:
[ ] Separation of concerns được tuân thủ?
[ ] Không có circular dependencies?
[ ] Abstraction levels phù hợp?
Domain Layer:
[ ] Entities validate đầy đủ?
[ ] Business logic ở đúng chỗ?
[ ] Không có framework/database dependencies?
[ ] Invariants được enforce?
Application Layer:
[ ] Handlers mỏng, chỉ orchestrate?
[ ] DTOs được sử dụng?
[ ] Dependencies inject đúng?
[ ] Transaction boundaries rõ ràng?
Infrastructure Layer:
[ ] Implementations tuân thủ interfaces?
[ ] Controllers mỏng, chỉ HTTP concerns?
[ ] Database/External service details được encapsulate?
Testing:
[ ] Unit tests cho critical business logic?
[ ] Integration tests cho data access?
[ ] Test coverage đạt yêu cầu?
[ ] Tests maintainable và readable?
Code Quality:
[ ] Naming conventions nhất quán?
[ ] SOLID principles tuân thủ?
[ ] No code smells (God Class, Long Method, etc.)?
[ ] Documentation đầy đủ cho public APIs?
14.2 Severity Levels
Severity
Mô tả
Action
Blocker
Vi phạm nghiêm trọng kiến trúc
MUST fix trước khi merge
Critical
Business logic sai, security issue
MUST fix trước khi merge
Major
Code quality, testability issue
SHOULD fix
Minor
Naming, formatting
Optional, theo team convention


15. TECHNOLOGY-SPECIFIC NOTES
15.1 Java/Spring Boot
// DI Container configuration
@Configuration
public class ApplicationConfig {
    @Bean
    public IOrderRepository orderRepository(EntityManager em) {
        return new JpaOrderRepository(em);
    }
    
    @Bean
    public PlaceOrderHandler placeOrderHandler(
        IOrderRepository orderRepo,
        IEbookRepository ebookRepo
    ) {
        return new PlaceOrderHandler(orderRepo, ebookRepo);
    }
}

15.2 .NET/C#
// Program.cs / Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Repositories
    services.AddScoped<IOrderRepository, SqlServerOrderRepository>();
    
    // Handlers
    services.AddScoped<PlaceOrderHandler>();
    
    // Other services
    services.AddDbContext<ApplicationDbContext>();
}

15.3 Node.js/TypeScript
// di-container.ts
import { Container } from 'inversify';

const container = new Container();

container.bind<IOrderRepository>('IOrderRepository')
  .to(MongoOrderRepository);
  
container.bind<PlaceOrderHandler>('PlaceOrderHandler')
  .to(PlaceOrderHandler);

export { container };

15.4 Python/FastAPI
# main.py
from fastapi import FastAPI, Depends
from dependency_injector.wiring import inject, Provide

app = FastAPI()
container = Container()
container.wire(modules=[__name__])

@app.post("/orders")
@inject
async def create_order(
    request: PlaceOrderRequest,
    handler: PlaceOrderHandler = Depends(Provide[Container.place_order_handler])
):
    command = PlaceOrderCommand(request.ebook_id, request.email, request.quantity)
    order_id = await handler.handle(command)
    return {"order_id": order_id}

15.5 Go
// wire.go (using Wire for DI)
//+build wireinject

func InitializeApp(db *sql.DB) (*Application, error) {
    wire.Build(
        NewOrderRepository,
        NewEbookRepository,
        NewPlaceOrderHandler,
        NewOrderController,
        NewApplication,
    )
    return &Application{}, nil
}

15.6 Ruby/Rails
# config/initializers/container.rb
require 'dry/container'
require 'dry/auto_inject'

class Container
  extend Dry::Container::Mixin
  
  register(:order_repository) {
    Infrastructure::Persistence::ActiveRecordOrderRepository.new
  }
  
  register(:place_order_handler) {
    Application::Order::Handlers::PlaceOrderHandler.new(
      order_repository: resolve(:order_repository)
    )
  }
end

Import = Dry::AutoInject(Container)


16. REFACTORING LEGACY CODE
16.1 Chiến lược tiếp cận
Nguyên tắc:
KHÔNG refactor toàn bộ cùng lúc
Áp dụng Strangler Fig Pattern
Ưu tiên module quan trọng/thay đổi nhiều nhất
Quy trình 7 bước:
┌─────────────────────────────────────────────┐
│ 1. IDENTIFY: Chọn module refactor           │
│    - List dependencies                       │
│    - Vẽ diagram hiện tại                     │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 2. PROTECT: Viết tests cho behavior hiện tại│
│    - Integration tests                       │
│    - Đảm bảo tests PASS                      │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 3. EXTRACT DOMAIN: Tạo Domain Entities      │
│    - Move validation vào constructor         │
│    - Move business logic vào methods         │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 4. CREATE REPOSITORY: Interface + Impl      │
│    - Interface trong Domain                  │
│    - Implementation trong Infrastructure     │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 5. CREATE HANDLER: Application Service      │
│    - Orchestrate use case                    │
│    - Inject repositories                     │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 6. UPDATE CONTROLLER: Gọi Handler           │
│    - Chạy lại tests - phải PASS              │
│    - Xóa code cũ                             │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ 7. ADD UNIT TESTS: Test Domain & Handler    │
│    - Target coverage >= 80%                  │
└─────────────────────────────────────────────┘

16.2 Pull Request Template
## Refactor: [Module Name] - Apply Clean Architecture

### Changes
- ✅ Extracted Domain Entity: `Order`
- ✅ Created Repository Interface: `IOrderRepository`
- ✅ Implemented Repository: `SqlOrderRepository`
- ✅ Created Application Handler: `PlaceOrderHandler`
- ✅ Updated Controller to use Handler

### Architecture Compliance
- [x] Core Code separated from Infrastructure
- [x] Repository Pattern applied
- [x] Dependency Injection used
- [x] No business logic in Controller

### Testing
- [x] Existing integration tests PASS
- [x] New unit tests for Domain (Coverage: 90%)
- [x] New unit tests for Handler (Coverage: 85%)
- [x] Overall coverage: 87%

### Backward Compatibility
- ✅ API contracts unchanged
- ✅ Database schema unchanged
- ⚠️ Internal structure changed (non-breaking)

### Rollout Plan
- [ ] Deploy to staging
- [ ] Monitor for 48h
- [ ] Deploy to production (canary: 10% → 50% → 100%)

### Review Checklist
- [ ] Code follows SOP
- [ ] No regressions
- [ ] Tests comprehensive
- [ ] Documentation updated


17. MONITORING & METRICS
17.1 Code Quality Metrics
Theo dõi định kỳ:
Metric
Target
Frequency
Test Coverage
>= 80%
Per commit
Cyclomatic Complexity
< 10 per method
Weekly
Code Violations
0 critical
Per PR
Technical Debt Ratio
< 5%
Monthly

Tools khuyến nghị:
Java: SonarQube, JaCoCo, Checkstyle
.NET: SonarQube, dotCover, StyleCop
JavaScript/TypeScript: ESLint, Jest, SonarQube
Python: Pylint, Coverage.py, Bandit
Go: golangci-lint, go test -cover
17.2 Architecture Metrics
Theo dõi hàng tháng:
Metric
Cách đo
Target
Layer violations
Static analysis
0
Circular dependencies
Dependency graph
0
Entities without validation
Code review
0
Fat controllers (>50 LOC)
Static analysis
0
Handlers without tests
Coverage report
0


18. FAQS
Q1: Khi nào KHÔNG cần áp dụng kiến trúc này?
A:
Prototype/POC chạy < 1 tháng
Scripts một lần, không maintain
Dự án cực đơn giản (< 3 use cases)
Microservice cực nhỏ (< 5 endpoints)
Trong mọi trường hợp khác, NÊN áp dụng.

Q2: Code nhiều hơn, có chậm development không?
A:
Ngắn hạn: Có thể chậm 20-30% lúc đầu
Dài hạn: Nhanh hơn RẤT NHIỀU do:
Dễ maintain
Dễ extend
Ít bug
Test coverage cao
ROI: Thường thấy sau 2-3 tháng

Q3: Có cần áp dụng 100% cho mọi feature không?
A:
Core features: YES (Auth, Payment, Order, User Management)
CRUD đơn giản: Có thể đơn giản hóa
Utilities/Helpers: Tùy chọn
Admin panels: Có thể linh hoạt
Nguyên tắc: Càng quan trọng, càng cần nghiêm ngặt.

Q4: Làm sao biết code nào là Core vs Infrastructure?
A: Tự hỏi:
"Code này có chạy được mà KHÔNG cần DB/Network/File không?"
CÓ → Core Code
KHÔNG → Infrastructure Code

Q5: Repository có bắt buộc không?
A: CÓ. Repository là cầu nối BẮT BUỘC giữa Domain và Infrastructure.
Không Repository = Domain phụ thuộc DB = Vi phạm Clean Architecture.

Q6: Framework X không support DI, làm sao?
A:
Tìm thư viện DI bên thứ 3
Tự implement simple DI container
Worst case: Manual injection (vẫn tốt hơn Service Locator)

Q7: ORM model vs Domain entity - có duplicate không?
A:
CÓ, nhưng đó là intentional duplication
ORM Model: Infrastructure concern (database structure)
Domain Entity: Business concern (business rules)
Mapping layer giữa 2 thứ này là CẦN THIẾT

19. TRAINING ROADMAP
19.1 Week 1: Foundations
Objectives:
Hiểu Core vs Infrastructure
Hiểu 3-tier architecture
Hiểu Repository pattern
Activities:
[ ] Đọc SOP sections 2-5
[ ] Code along: Simple Order example
[ ] Quiz: Identify Core vs Infrastructure code

19.2 Week 2: Hands-on Practice
Objectives:
Implement Domain Model
Implement Repository
Write unit tests
Activities:
[ ] Refactor 1 existing feature
[ ] Code review với senior
[ ] Present learnings to team

19.3 Week 3: Advanced Patterns
Objectives:
Application Services
Command/Query pattern
Hexagonal Architecture
Activities:
[ ] Implement complex use case
[ ] Write integration tests
[ ] Pair programming session

19.4 Week 4: Production Ready
Objectives:
Deploy to production
Monitor metrics
Handle incidents
Activities:
[ ] Complete 1 feature end-to-end
[ ] Pass all checklists
[ ] Conduct team retrospective

20. GOVERNANCE
20.1 Roles & Responsibilities
Role
Responsibility
Tech Lead
- Enforce SOP<br>- Architecture reviews<br>- Mentoring
Senior Dev
- Code reviews<br>- Refactoring leadership<br>- Knowledge sharing
Developer
- Follow SOP<br>- Write tests<br>- Ask questions
QA
- Test coverage validation<br>- Integration testing<br>- Bug reporting

20.2 Exception Process
Khi cần vi phạm SOP:
Document reason trong code comment
Create tech debt ticket trong backlog
Get approval từ Tech Lead
Set deadline để resolve
Track trong monthly metrics
20.3 SOP Updates
Review cycle: Quarterly
Propose changes: Via pull request to SOP repo
Approval: Requires 2/3 team vote
Effective date: After 2-week notice period

APPENDIX A: TERMINOLOGY
Term
Definition
Synonym
Entity
Domain object với identity duy nhất
Domain Entity, Aggregate Root
Value Object
Immutable object không có identity
VO
Repository
Interface để persist/retrieve entities
Data Access Object
Port
Interface định nghĩa cách tương tác
Contract, Protocol
Adapter
Implementation cụ thể của Port
Concrete Implementation
DTO
Data Transfer Object
Command, Query, Request/Response
Handler
Xử lý use case
Service, Use Case Interactor
Aggregate
Nhóm entities liên quan, có boundary
Consistency Boundary


APPENDIX B: REFERENCES
Books
"Domain-Driven Design" - Eric Evans
"Clean Architecture" - Robert C. Martin
"Implementing Domain-Driven Design" - Vaughn Vernon
"Patterns of Enterprise Application Architecture" - Martin Fowler
Online Resources
Martin Fowler's Blog
Domain-Driven Design Community
Clean Architecture Blog
Internal
Architecture Decision Records: /docs/adr/
Team Wiki: [Internal Link]
Slack Channel: #architecture-guild

APPENDIX C: FULL EXAMPLE (Order Module)
Xem file riêng: examples/order-module/README.md

Document Version: 1.0
 Last Updated: {date}
 Maintained by: Technical Leadership Team
 Next Review: {date + 3 months}

CHANGELOG
Version
Date
Changes
Author
1.0
{date}
Initial release
Tech Lead


END OF DOCUMENT

