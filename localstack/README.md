# AWS Integration with LocalStack for S3

## 4.1 Local Configuration

### 1. Set Up LocalStack

LocalStack is a fully functional local AWS cloud stack to simulate AWS services like S3 in a local environment. For this, we will use Docker and `docker-compose`.

- **Install Docker**: If Docker is not installed, follow [Docker's installation guide](https://docs.docker.com/get-docker/).

- **Install Docker Compose**: Similarly, ensure you have Docker Compose installed by following [Docker Compose's installation guide](https://docs.docker.com/compose/install/).

- **Create `docker-compose.yml`** for LocalStack:

```yaml

version: '3'
services:
  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      - DOCKER_HOST=unix:///var/run/docker.sock
      - SERVICES=sns,s3,sts
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./tmp/localstack:/var/lib/localstack"
    networks:
      - localstack-network

networks:
  localstack-network:
    driver: bridge
