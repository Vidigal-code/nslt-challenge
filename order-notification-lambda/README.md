# Order Notification Lambda (Serverless Framework)

This service simulates the asynchronous portion of the challenge. It exposes two Lambda handlers via Serverless + serverless-offline:

1. `sendOrderNotification` – triggered via HTTP to notify new orders (validates payload, looks up Mongo, publishes SNS/log).
2. `processSalesReport` – triggered via HTTP and cron to aggregate sales metrics from the last 24h and publish a report.

Everything runs fully offline thanks to LocalStack (SNS) and MongoDB running in Docker Compose alongside the backend and frontend.

## Architecture

- **Domain ports** (`src/domain/ports`) abstract Mongo access and SNS publishing.
- **Use-cases** (`src/application/use-cases`) implement the business logic with validation (Zod) and shared response helpers.
- **Infrastructure** (`src/infrastructure`) provides Mongo repository + SNS adapter.
- **Handler/bootstrap** wires dependencies, ensures a single Mongo connection, and exports the Lambda handlers.

```
src/
 ├── application/use-cases/   # send-order-notification, process-sales-report + tests
 ├── domain/ports/            # OrderRepositoryPort, NotificationPort
 ├── infrastructure/          # Mongo repository, SNS adapter
 ├── shared/                  # errors, success messages, http helpers
 ├── handler.ts               # dependency wiring + connection management
 └── main.ts                  # serverless entry points (HTTP)
```

## Commands

```bash
pnpm install
pnpm test        # Jest (ts-jest) with mocked ports
pnpm offline     # serverless offline start --httpPort 4000
```

The service is also started automatically by `docker-compose up --build` from the repository root (see root README for details).

## Environment Variables

The lambda reads the same root `.env` used by Docker Compose. Keys of interest:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string (Docker uses `mongodb://mongo:27017/nouslatam`) |
| `SNS_TOPIC_NAME`, `SNS_TOPIC_ARN` | LocalStack SNS topic information |
| `AWS_*`, `LOCALSTACK_*`, `SERVICES` | LocalStack credentials and endpoints |

When running the lambda container, these variables are loaded automatically (`env_file: .env` in `docker-compose.yml`).

## Testing

Jest is configured via `jest.config.cjs`. Unit tests mock the repository + notifier ports:

- `send-order-notification.usecase.spec.ts`
- `process-sales-report.usecase.spec.ts`

Run them with:
```bash
pnpm test
```

## Local HTTP Endpoints (serverless-offline)

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/order/notification` | Body `{ orderId, total }`. Validates payload, fetches Mongo order, publishes SNS/logs. |
| `POST` | `/reports/sales` | No body. Aggregates last 24h of orders and publishes SNS/logs. |

Both routes return a consistent JSON envelope thanks to `shared/http.ts`.

## Deployment Notes

- The project targets Serverless Framework v4 (Node 20 runtime) and can be deployed to AWS if credentials/topics are provided.
- Locally it relies on LocalStack; no extra setup is required beyond the root Docker Compose.

For CI and repository-wide information, refer to the root `README.md`.