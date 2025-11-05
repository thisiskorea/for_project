# Development Guide

## Project Structure

```
ai-research-platform/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   ├── auth-service/           # Authentication service (NestJS)
│   ├── project-service/        # Project management (NestJS)
│   ├── paper-service/          # Paper management (FastAPI)
│   └── dataset-service/        # Dataset management (FastAPI)
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── config/                 # Configuration
├── infrastructure/
│   ├── docker/                 # Docker configurations
│   └── kubernetes/             # K8s manifests
└── docs/                       # Additional documentation
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod

### Backend
- **Node.js Services**: NestJS (Auth, Project)
- **Python Services**: FastAPI (Paper, Dataset)
- **API Documentation**: OpenAPI/Swagger

### Databases
- **PostgreSQL**: User data, projects, experiments
- **MongoDB**: Papers, posts, activities
- **Redis**: Caching, sessions
- **Elasticsearch**: Full-text search

### Infrastructure
- **Orchestration**: Kubernetes
- **Containers**: Docker
- **Storage**: S3/MinIO
- **ML Tracking**: MLflow

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Install dependencies
npm install

# Start Docker services
npm run docker:dev

# Start all services in dev mode
npm run dev
```

### 2. Working with Services

#### Frontend (Next.js)
```bash
cd apps/web
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Lint code
```

#### Backend Services (NestJS)
```bash
cd apps/auth-service  # or project-service
npm run dev          # Start with hot reload
npm run build        # Build
npm run test         # Run tests
```

#### Python Services (FastAPI)
```bash
cd apps/paper-service  # or dataset-service
python main.py       # Start dev server
# Auto-reload is enabled in development
```

### 3. Database Migrations

#### PostgreSQL (TypeORM)
```bash
npm run typeorm migration:generate -- -n MigrationName
npm run typeorm migration:run
```

### 4. Adding New Features

**Step 1: Define Types**
```typescript
// packages/types/index.ts
export interface NewFeature {
  id: string
  name: string
  // ...
}
```

**Step 2: Create Backend API**
```typescript
// Example: NestJS Controller
@Controller('features')
export class FeaturesController {
  @Get()
  findAll() {
    return this.featuresService.findAll()
  }
}
```

**Step 3: Create Frontend UI**
```typescript
// Example: Next.js Page
export default function FeaturesPage() {
  const { data } = useQuery(['features'], fetchFeatures)

  return (
    <div>
      {/* UI components */}
    </div>
  )
}
```

**Step 4: Add Tests**
```typescript
describe('FeaturesController', () => {
  it('should return all features', () => {
    // Test implementation
  })
})
```

### 5. Code Style

#### TypeScript/JavaScript
```typescript
// Use functional components with hooks
export default function Component() {
  const [state, setState] = useState()

  useEffect(() => {
    // Side effects
  }, [])

  return <div>Content</div>
}

// Use async/await
async function fetchData() {
  try {
    const result = await api.get('/data')
    return result.data
  } catch (error) {
    handleError(error)
  }
}
```

#### Python
```python
# Follow PEP 8
from typing import List, Optional
from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/items", response_model=List[Item])
async def get_items(
    skip: int = 0,
    limit: int = 100,
    session: AsyncSession = Depends(get_session)
) -> List[Item]:
    """Get all items."""
    return await item_service.get_items(session, skip, limit)
```

## Testing

### Unit Tests
```bash
# Frontend
cd apps/web
npm run test

# Backend (NestJS)
cd apps/auth-service
npm run test

# Backend (FastAPI)
cd apps/paper-service
pytest
```

### Integration Tests
```bash
npm run test:e2e
```

### Manual Testing
```bash
# Use HTTPie or curl
http GET http://localhost:4001/auth/me \
  Authorization:"Bearer <token>"
```

## Debugging

### Frontend
- Use React DevTools
- Check browser console
- Use VS Code debugger

### Backend
- Use console.log / print statements
- Set breakpoints in VS Code
- Check service logs: `docker-compose logs service-name`

## Common Tasks

### Adding a New Page
```bash
# Create new page
mkdir -p apps/web/src/app/new-page
touch apps/web/src/app/new-page/page.tsx
```

### Adding a New API Endpoint
```typescript
// 1. Define route in controller
@Get('new-endpoint')
async newEndpoint() {
  return this.service.getData()
}

// 2. Implement service method
async getData() {
  return this.repository.find()
}

// 3. Add tests
```

### Adding a Database Table
```typescript
// 1. Create entity
@Entity('new_table')
export class NewTable {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // columns...
}

// 2. Add to module
@Module({
  imports: [TypeOrmModule.forFeature([NewTable])],
})
```

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement code splitting
- Optimize images with next/image
- Use TanStack Query for caching

### Backend
- Add database indexes
- Implement caching with Redis
- Use database connection pooling
- Optimize N+1 queries

## Best Practices

1. **Always use TypeScript** - Type safety prevents bugs
2. **Write tests** - Aim for >80% coverage
3. **Document APIs** - Use OpenAPI/Swagger
4. **Handle errors gracefully** - User-friendly messages
5. **Validate input** - Use Zod or class-validator
6. **Use environment variables** - Never hardcode secrets
7. **Follow DRY principle** - Don't repeat yourself
8. **Keep functions small** - Single responsibility
9. **Use meaningful names** - Self-documenting code
10. **Review your own code** - Before submitting PR

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

### Commit Message Format
```
feat: add user authentication
fix: resolve database connection issue
docs: update API documentation
refactor: simplify user service
test: add tests for auth controller
chore: update dependencies
```

## Troubleshooting

### Docker Issues
```bash
# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up

# Clean up
docker system prune -a
```

### Module Resolution
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Getting Help

- Check existing documentation
- Search GitHub issues
- Ask in team chat
- Create new GitHub issue with detailed description
