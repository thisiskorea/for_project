# Deployment Guide

This guide covers deploying the AI Research Platform to production.

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for development)
- Python 3.10+ (for development)
- Kubernetes cluster (for production)
- AWS account (or alternative cloud provider)

### Development Environment

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-research-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Docker services**
```bash
npm run docker:dev
```

This will start:
- PostgreSQL (port 5432)
- MongoDB (port 27017)
- Redis (port 6379)
- Elasticsearch (port 9200)
- MinIO (port 9000, 9001)
- MLflow (port 5000)

4. **Set up environment variables**

Copy `.env.example` files in each service:
```bash
# Auth Service
cp apps/auth-service/.env.example apps/auth-service/.env

# Project Service
cp apps/project-service/.env.example apps/project-service/.env

# Paper Service
cp apps/paper-service/.env.example apps/paper-service/.env

# Dataset Service
cp apps/dataset-service/.env.example apps/dataset-service/.env

# Web Frontend
cp apps/web/.env.example apps/web/.env.local
```

5. **Start development servers**
```bash
# Terminal 1: Frontend
cd apps/web
npm install
npm run dev

# Terminal 2: Auth Service
cd apps/auth-service
npm install
npm run dev

# Terminal 3: Project Service
cd apps/project-service
npm install
npm run dev

# Terminal 4: Paper Service
cd apps/paper-service
pip install -r requirements.txt
python main.py

# Terminal 5: Dataset Service
cd apps/dataset-service
pip install -r requirements.txt
python main.py
```

6. **Access the application**
- Frontend: http://localhost:3000
- Auth Service: http://localhost:4001
- Project Service: http://localhost:4002
- Paper Service: http://localhost:4003
- Dataset Service: http://localhost:4004
- MLflow: http://localhost:5000
- MinIO Console: http://localhost:9001

## Production Deployment

### Using Docker Compose (Simple)

1. **Update environment variables for production**

2. **Build images**
```bash
docker-compose -f docker-compose.prod.yml build
```

3. **Start services**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Using Kubernetes (Recommended)

1. **Build and push Docker images**
```bash
# Build images
docker build -t your-registry/ai-research-web:latest ./apps/web
docker build -t your-registry/ai-research-auth:latest ./apps/auth-service
docker build -t your-registry/ai-research-project:latest ./apps/project-service
docker build -t your-registry/ai-research-paper:latest ./apps/paper-service
docker build -t your-registry/ai-research-dataset:latest ./apps/dataset-service

# Push to registry
docker push your-registry/ai-research-web:latest
docker push your-registry/ai-research-auth:latest
docker push your-registry/ai-research-project:latest
docker push your-registry/ai-research-paper:latest
docker push your-registry/ai-research-dataset:latest
```

2. **Deploy to Kubernetes**
```bash
kubectl apply -f infrastructure/kubernetes/
```

## Environment Variables

### Auth Service
```env
PORT=4001
NODE_ENV=production
DATABASE_HOST=your-postgres-host
DATABASE_PORT=5432
DATABASE_USER=airesearch
DATABASE_PASSWORD=<secure-password>
DATABASE_NAME=airesearch
JWT_SECRET=<secure-jwt-secret>
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
CORS_ORIGIN=https://your-domain.com
```

### Frontend (Next.js)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_AUTH_URL=https://api.your-domain.com/auth
NEXTAUTH_SECRET=<secure-secret>
NEXTAUTH_URL=https://your-domain.com
```

## Database Setup

### PostgreSQL
```sql
CREATE DATABASE airesearch;
CREATE USER airesearch WITH ENCRYPTED PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE airesearch TO airesearch;
```

### MongoDB
```javascript
use airesearch
db.createUser({
  user: "airesearch",
  pwd: "secure-password",
  roles: [{ role: "readWrite", db: "airesearch" }]
})
```

## Monitoring

- Set up Prometheus for metrics collection
- Configure Grafana dashboards
- Enable application logging to ELK stack
- Set up Sentry for error tracking

## Backup Strategy

1. **PostgreSQL**: Daily automated backups
2. **MongoDB**: Continuous backup with point-in-time recovery
3. **S3/MinIO**: Versioning enabled, cross-region replication

## Security Checklist

- [ ] Update all default passwords
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Implement API key rotation
- [ ] Set up 2FA for admin accounts
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Scaling

### Horizontal Scaling
- Frontend: Multiple Next.js instances behind load balancer
- Backend services: Auto-scaling based on CPU/memory
- Databases: Read replicas for PostgreSQL/MongoDB

### Vertical Scaling
- Increase resources for database servers
- Optimize queries and indexes
- Implement caching strategies

## Troubleshooting

### Common Issues

**Services can't connect to database**
- Check network connectivity
- Verify credentials
- Ensure database is accessible from service network

**Frontend can't reach backend**
- Verify CORS configuration
- Check API URL in environment variables
- Ensure API Gateway is running

**High memory usage**
- Check for memory leaks
- Optimize queries
- Increase resource limits

## Support

For issues and questions:
- GitHub Issues: <repository-url>/issues
- Documentation: See MASTERPLAN.md and README.md
