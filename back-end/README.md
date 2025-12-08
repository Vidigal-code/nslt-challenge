# Backend (NestJS + MongoDB + CQRS)

This service implements the REST API required by the challenge using **NestJS 11**, **MongoDB**, and **LocalStack/S3** for file handling. The codebase follows a layered structure (DDD + Hexagonal + CQRS) and is fully covered by unit and integration (e2e) tests.

## Stack & Features

- CQRS handlers for Products, Categories, Orders, Dashboard.
- Mongo repositories implemented as adapters (see `src/**/infrastructure`).
- Ports for S3 image storage and order notification (lambda HTTP client).
- DTO validation (class-validator), centralized errors, and Swagger docs at `/docs`.
- Seed script (`pnpm migrate`) populates Mongo with sample catalog data.
- Tests: Jest unit specs + Supertest e2e suite backed by mongodb-memory-server.

## Project Structure

```
src/
 ├── app.module.ts
 ├── domain/                # ports, repositories, tokens
 ├── product|category|order/
 │     ├── application/      # commands, queries, handlers, services (use-cases)
 │     ├── interfaces/       # http controllers + swagger decorators
 │     └── infrastructure/   # mongo repositories, adapters
 ├── dashboard/              # dashboard CQRS + aggregation pipeline
 ├── aws/                    # S3 adapter (implements ImageStoragePort)
 └── shared/                 # error/success messages, interceptors
```

## Local Commands

```bash
pnpm install
pnpm start:dev      # start Nest API with watch
pnpm migrate        # seed Mongo with categories/products/orders
pnpm test           # unit tests (ts-jest)
pnpm test:e2e       # e2e tests (Supertest + mongodb-memory-server)
pnpm lint           # eslint
```

Swagger is automatically available once the app is running: `http://localhost:3000/docs`.

## Environment Variables

The service reads the root `.env` file created from `env.example.txt`. Important keys:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | connection string (Docker Compose sets this to the `mongo` container) |
| `S3_ENDPOINT`, `S3_ENDPOINT_HOST_MY_BUCKET`, `AWS_*` | LocalStack S3 configuration |
| `API_LAMBDA` | URL for the order notification lambda |

When running inside Docker Compose the `mongo`, `localstack`, and `localstack-lambda-app` hostnames are already resolvable (see `docker-compose.yml`).

## Testing Strategy

| Layer | Command | Notes |
| --- | --- | --- |
| Unit | `pnpm test` | tests services/handlers with mocked ports |
| Integration (e2e) | `pnpm test:e2e` | boots AppModule + in-memory Mongo; exercises HTTP endpoints for products, categories, orders |

## Seed Script

```
pnpm migrate
```

Populates Mongo with sample categories, products (with category references), and orders. Useful for demo data in the dashboard and frontend.

## CI

The root GitHub Actions workflow (`.github/workflows/ci.yml`) executes `pnpm test && pnpm test:e2e` for this package on every push/PR. Secrets (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `MONGO_URI`) can be provided but default to local/test values so the pipeline works out-of-the-box.

---

For high-level documentation of the entire stack, see the repository root `README.md`.
