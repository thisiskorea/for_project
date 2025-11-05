# AI Research Platform

A comprehensive platform for AI researchers - combining paper management, project collaboration, experiment tracking, and cloud computing.

## Project Structure

```
├── apps/
│   ├── web/                 # Next.js 14 frontend
│   ├── api-gateway/         # API Gateway
│   ├── auth-service/        # Authentication service
│   ├── project-service/     # Project management service
│   ├── paper-service/       # Paper management service
│   ├── dataset-service/     # Dataset management service
│   └── compute-service/     # Computing resources service
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── config/              # Shared configurations
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
└── infrastructure/
    ├── docker/              # Docker configurations
    └── kubernetes/          # Kubernetes manifests
```

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui

### Backend
- Node.js + NestJS
- Python + FastAPI
- PostgreSQL
- MongoDB
- Redis
- Elasticsearch

### Infrastructure
- Docker & Docker Compose
- Kubernetes
- AWS (EKS, RDS, S3)

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Docker & Docker Compose
- Python 3.10+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-research-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start development services:
```bash
npm run docker:dev
```

4. Start development servers:
```bash
npm run dev
```

5. Open your browser:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:4000
- Auth Service: http://localhost:4001
- Project Service: http://localhost:4002

## Development

### Commands

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all applications
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run docker:dev` - Start Docker services
- `npm run docker:down` - Stop Docker services

### Adding a New Package

```bash
npx turbo gen workspace
```

## Documentation

See [MASTERPLAN.md](./MASTERPLAN.md) for the comprehensive project plan.

## License

MIT
