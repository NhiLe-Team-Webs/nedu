# Sơ đồ luồng công việc cải thiện Responsive cho N-Edu Website

## Overall Workflow

```mermaid
graph TD
    A[Phân tích hiện tại] --> B[Header & Footer]
    A --> C[Trang chủ]
    A --> D[Component Courses]
    A --> E[Trang Program]
    A --> F[Trang chi tiết khóa học]
    A --> G[Cart & Checkout]
    A --> H[Trang Thử thách 30 ngày]
    A --> I[Trang Liên hệ]
    A --> J[Trang phụ]
    A --> K[Sidebar]
    
    B --> L[Kiểm tra & Tối ưu]
    C --> L
    D --> L
    E --> L
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[Hoàn thành]
```

## Module Dependencies

```mermaid
graph LR
    subgraph "Phase 1: Core Components"
        A1[Header]
        A2[Footer]
        A3[Globals CSS]
    end
    
    subgraph "Phase 2: Main Pages"
        B1[Trang chủ]
        B2[Courses Carousel]
        B3[Program Page]
    end
    
    subgraph "Phase 3: User Flow"
        C1[Cart]
        C2[Checkout]
        C3[Payment Success]
    end
    
    subgraph "Phase 4: Supporting Pages"
        D1[Thử thách 30 ngày]
        D2[Liên hệ]
        D3[Policy & Terms]
    end
    
    subgraph "Phase 5: Final Optimization"
        E1[Sidebar]
        E2[Testing & QA]
    end
    
    A1 --> B1
    A2 --> B1
    A3 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> D1
    D1 --> D2
    D2 --> D3
    D3 --> E1
    E1 --> E2
```

## Responsive Breakpoints Strategy

```mermaid
graph TD
    A[Mobile First Approach] --> B[Base Styles: 320px+]
    B --> C[Small Phones: 375px-414px]
    C --> D[Large Phones: 415px-767px]
    D --> E[Tablets: 768px-1024px]
    E --> F[Desktop: 1025px+]
    
    B --> G[Touch-friendly UI]
    C --> H[Optimized content]
    D --> I[Enhanced interactions]
    E --> J[Tablet layouts]
    F --> K[Full experience]
```

## File Structure & Modifications

```mermaid
graph TD
    A[app/layout.tsx] --> A1[Container adjustments]
    A --> A2[Meta tags for mobile]
    
    B[app/globals.css] --> B1[CSS variables]
    B --> B2[Responsive utilities]
    B --> B3[Mobile-first styles]
    
    C[components/Header.tsx] --> C1[Mobile menu]
    C --> C2[Logo sizing]
    C --> C3[Touch targets]
    
    D[components/Footer.tsx] --> D1[Layout reorganization]
    D --> D2[Link spacing]
    
    E[app/page.tsx] --> E1[Hero section]
    E --> E2[Content stacking]
    
    F[app/Courses.tsx] --> F1[Carousel touch]
    F --> F2[Card sizing]
    
    G[app/program/page.tsx] --> G1[Filter layout]
    G --> G2[Grid adjustments]
    
    H[app/cart/page.tsx] --> H1[Item layout]
    H --> H2[Form controls]
    
    I[app/checkout/page.tsx] --> I1[Multi-step form]
    I --> I2[Input sizing]