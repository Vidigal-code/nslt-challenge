# Test Offline Example

## 2. Asynchronous Task (Serverless Framework)

This section demonstrates how to use the **Serverless Framework** to create an **AWS Lambda function** that performs an asynchronous task in the background.

### 2.1. Lambda Function

We will create a Lambda function to process **sales reports** based on **orders**. This example shows how to handle background tasks that do not require immediate user interaction.

#### Steps to Create a Lambda Function

# Docker Compose Configuration for LocalStack and MongoDB Setup

## Overview

This document explains two different approaches for running LocalStack and MongoDB for serverless application development:

1. **Standalone Docker Containers** - Manual container management
2. **Docker Compose** - Orchestrated multi-container setup

Both approaches allow you to develop and test AWS Lambda functions, SNS topics, and database operations entirely offline, but with different execution methods and environment configurations.

## Method 1: Standalone Docker Containers (Manual Setup)

### Prerequisites
Before running your application outside of containers, you need to start the required services manually:

### Step 1: Start MongoDB Container
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

**Command Breakdown:**
- `docker run`: Creates and starts a new container
- `-d`: Runs container in detached mode (background)
- `--name mongodb`: Assigns a custom name to the container
- `-p 27017:27017`: Maps host port 27017 to container port 27017
- `mongo:latest`: Uses the latest MongoDB image

### Step 2: Start LocalStack Container
```bash
docker run -d --name localstack -p 4566:4566 \
  -e DOCKER_HOST=unix:///var/run/docker.sock \
  -e SERVICES=sns,s3,sts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v C:/path/to/your/localstack:/var/lib/localstack \
  localstack/localstack:latest
```

**Command Breakdown:**
- `-p 4566:4566`: Maps LocalStack's main endpoint port
- `-e DOCKER_HOST=unix:///var/run/docker.sock`: Sets Docker socket environment
- `-e SERVICES=sns,s3,sts`: Specifies which AWS services to emulate
- `-v /var/run/docker.sock:/var/run/docker.sock`: Mounts Docker socket for service management
- `-v C:/path/to/your/localstack:/var/lib/localstack`: Mounts local directory for LocalStack data persistence

### Environment Configuration for Standalone Setup

When running your **application outside containers** (directly on your host machine), use these environment variables:

```bash
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/nouslatam
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:test-sns-topic
SNS_TOPIC_NAME=test-sns-topic
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
LOCALSTACK_HOST=localhost
LOCALSTACK_ENDPOINT=http://localhost:4566
SERVICES=sns,s3,lambda
DEBUG=1
```

**Key Points for Standalone Setup:**
- Your application runs on the **host machine**
- MongoDB and LocalStack run in **separate containers**
- Use `localhost` to connect to containerized services
- Ports are mapped from containers to host (27017, 4566)

### Execution Flow for Standalone Setup
1. Start MongoDB container → Available at `localhost:27017`
2. Start LocalStack container → Available at `localhost:4566`
3. Run your application on host machine → Connects to containers via localhost
4. Application uses `MONGO_URI=mongodb://localhost:27017/nouslatam`
5. Application uses `LOCALSTACK_ENDPOINT=http://localhost:4566`

---

## Method 2: Docker Compose (Orchestrated Setup)

### Architecture

The Docker Compose setup consists of three main services:
- **app**: Your serverless application (containerized)
- **localstack**: AWS services emulator (containerized)
- **mongo**: MongoDB database (containerized)

All services communicate through a custom Docker network called `app-network`.

## Docker Compose Breakdown

### Service: app
```yaml
app:
  build: .
  container_name: localstack-lambda-app
  ports:
    - "4000:4000"
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  networks:
    - app-network
  env_file:
    - .env
  depends_on:
    - localstack
    - mongo
  restart: unless-stopped
```

**Configuration Details:**
- **build**: Builds the application from the current directory's Dockerfile
- **container_name**: Sets a custom name for easier identification
- **ports**: Maps port 4000 from container to host
- **volumes**: Mounts Docker socket to enable Docker-in-Docker operations
- **networks**: Connects to the custom network for inter-service communication
- **env_file**: Loads environment variables from `.env` file
- **depends_on**: Ensures LocalStack and MongoDB start before the app
- **restart**: Automatically restarts the container unless manually stopped

### Service: localstack
```yaml
localstack:
  image: localstack/localstack:latest
  container_name: localstack
  ports:
    - "4566:4566"
  env_file:
    - .env
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  networks:
    - app-network
```

**Configuration Details:**
- **image**: Uses the latest LocalStack image
- **ports**: Exposes LocalStack's main endpoint (4566)
- **volumes**: Docker socket access for service management
- **env_file**: Loads configuration from `.env`

### Service: mongo
```yaml
mongo:
  image: mongo:6.0
  container_name: mongodb
  ports:
    - "27017:27017"
  networks:
    - app-network
  volumes:
    - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    - mongo_data:/data/db
```

**Configuration Details:**
- **image**: Uses MongoDB version 6.0
- **ports**: Exposes MongoDB's default port
- **volumes**:
   - Mounts initialization script (read-only)
   - Creates persistent volume for database data

### Environment Configuration for Docker Compose

When running your **application inside a container** (via Docker Compose), use these environment variables:

```bash
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/nouslatam
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:test-sns-topic
SNS_TOPIC_NAME=test-sns-topic
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
LOCALSTACK_HOST=localstack
LOCALSTACK_ENDPOINT=http://localstack:4566
SERVICES=sns,s3,lambda
DEBUG=1
```

**Key Points for Docker Compose Setup:**
- All services run in **containers**
- Services communicate using **Docker network**
- Use **service names** instead of `localhost`
- No port mapping needed for inter-container communication

### Execution Flow for Docker Compose
1. `docker-compose up` starts all services simultaneously
2. Docker creates custom network `app-network`
3. All containers join the same network
4. Application container connects to `mongo:27017` (service name)
5. Application container connects to `localstack:4566` (service name)

---

## Comparison: Standalone vs Docker Compose

| Aspect | Standalone Containers | Docker Compose |
|--------|----------------------|----------------|
| **Application Location** | Host machine | Inside container |
| **MongoDB Connection** | `mongodb://localhost:27017` | `mongodb://mongo:27017` |
| **LocalStack Connection** | `http://localhost:4566` | `http://localstack:4566` |
| **Network** | Host networking + port mapping | Custom Docker network |
| **Startup Command** | Manual `docker run` commands | Single `docker-compose up` |
| **Service Discovery** | Via localhost + ports | Via service names |
| **Development** | Direct code editing | Requires rebuild for changes |
| **Debugging** | Easy (native debugging) | Container debugging required |
| **Isolation** | Partial | Complete |

## When to Use Each Approach

### Use Standalone Containers When:
- You want to run your application directly on your host machine
- You need easy debugging and development with hot-reload
- You prefer manual control over each service
- You want to use your local development tools directly
- You're developing and testing frequently

### Use Docker Compose When:
- You want complete environment isolation
- You need consistent environments across team members
- You're preparing for production deployment
- You want automated service orchestration
- You need to simulate production-like networking

## Network Configuration

```yaml
networks:
  app-network:
    driver: bridge
```

Creates a custom bridge network that allows all services to communicate using their service names as hostnames.

## Volume Configuration

```yaml
volumes:
  mongo_data:
```

Creates a named volume for MongoDB data persistence, ensuring data survives container restarts.

## Startup Process

1. **Network Creation**: Docker creates the `app-network`
2. **Volume Creation**: Creates the `mongo_data` volume
3. **LocalStack Startup**: Initializes AWS service emulation
4. **MongoDB Startup**: Starts database and runs initialization script
5. **Application Startup**: Builds and starts your app with access to both services

## Development Workflow

## Complete Step-by-Step Execution Guide

### Method 1: Standalone Containers Execution

**Step 1: Start Required Services**
```bash
# Start MongoDB (must be first)
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Start LocalStack (must be second)
docker run -d --name localstack -p 4566:4566 \
  -e DOCKER_HOST=unix:///var/run/docker.sock \
  -e SERVICES=sns,s3,sts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v C:/path/to/your/localstack:/var/lib/localstack \
  localstack/localstack:latest
```

**Step 2: Verify Services are Running**
```bash
# Check containers status
docker ps

# Test MongoDB connection
docker exec -it mongodb mongo --eval "db.runCommand('ping')"

# Test LocalStack
curl http://localhost:4566/health
```

**Step 3: Configure Environment Variables**
Create `.env` file with standalone configuration:
```bash
MONGO_URI=mongodb://localhost:27017/nouslatam
LOCALSTACK_ENDPOINT=http://localhost:4566
# ... other variables
```

**Step 4: Run Your Application**
```bash
# Install dependencies
npm install

# Start your application on host machine
npm start
# or
node server.js
```

**Step 5: Test AWS Services**
```bash
# Create SNS topic
aws --endpoint-url=http://localhost:4566 sns create-topic --name test-sns-topic

# List topics
aws --endpoint-url=http://localhost:4566 sns list-topics
```

**Cleanup Standalone Setup:**
```bash
docker stop mongodb localstack
docker rm mongodb localstack
```

### Method 2: Docker Compose Execution

**Step 1: Prepare Docker Compose Files**
Ensure you have:
- `docker-compose.yml`
- `.env` file with Docker Compose configuration
- `Dockerfile` for your application

**Step 2: Start All Services**
```bash
# Start all services in background
docker-compose up -d

# Or start with logs visible
docker-compose up
```

**Step 3: Verify Services**
```bash
# Check all services status
docker-compose ps

# View logs
docker-compose logs -f app
docker-compose logs -f localstack
docker-compose logs -f mongo
```

**Step 4: Test Services**
```bash
# Test from host machine (ports are still mapped)
curl http://localhost:4566/health

# Test from within app container
docker-compose exec app curl http://localstack:4566/health
```

**Step 5: Development Workflow**
```bash
# Rebuild after code changes
docker-compose up --build

# Restart specific service
docker-compose restart app

# View real-time logs
docker-compose logs -f app
```

**Cleanup Docker Compose:**
```bash
# Stop and remove containers
docker-compose down

# Remove volumes too
docker-compose down -v
```

## Troubleshooting Common Issues

### Standalone Container Issues

**Problem**: Application can't connect to MongoDB
```bash
# Check if MongoDB is running
docker ps | grep mongodb

# Check MongoDB logs
docker logs mongodb

# Test connection
telnet localhost 27017
```

**Problem**: LocalStack services not available
```bash
# Check LocalStack status
docker logs localstack

# Verify services are running
curl http://localhost:4566/health
```

### Docker Compose Issues

**Problem**: Services can't communicate
```bash
# Check network
docker network ls
docker network inspect <project>_app-network

# Check if all services are in same network
docker-compose ps
```

**Problem**: Environment variables not loaded
```bash
# Check configuration
docker-compose config

# Check environment inside container
docker-compose exec app env | grep MONGO_URI
```

## Performance Considerations

### Standalone Containers
- **Pros**: Faster development cycle, direct debugging
- **Cons**: Manual service management, potential port conflicts

### Docker Compose
- **Pros**: Automated orchestration, complete isolation
- **Cons**: Slower startup, requires container rebuilds for changes

## Best Practices

### For Development (Standalone)
1. Always start MongoDB first, then LocalStack
2. Use health checks before starting your application
3. Keep containers running during development session
4. Use docker logs for troubleshooting

### For Team Development (Docker Compose)
1. Use `.env` files for configuration
2. Include health checks in docker-compose.yml
3. Use volumes for persistent data
4. Document the startup process in README

The choice between standalone containers and Docker Compose depends on your development workflow and team requirements. Standalone offers faster iteration, while Docker Compose provides better environment consistency and isolation.