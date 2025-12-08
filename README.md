# NSLT Challenge – Full Stack Monorepo

This repository contains the complete solution for the NSLT challenge: a full-stack platform built with **NestJS + MongoDB** (DDD + Hexagonal + CQRS), **React + Vite** following **Feature-Sliced Design**, and an **order notification lambda** implemented with the **Serverless Framework**. Everything runs locally through Docker/LocalStack and is covered by automated tests and CI.

## Highlights

- **Back-end**: NestJS 11, CQRS, Mongo, S3 integration via LocalStack, Swagger documentation at `/docs`.
- **Front-end**: React + Vite + MUI, Redux Toolkit, React Query, Storybook, feature-sliced structure.
- **Lambda**: Serverless/TypeScript, Mongo/SNS integration, use-cases for order notifications and sales reports.
- **Infrastructure**: Docker Compose orchestrates API, frontend, lambda, LocalStack, and Mongo.
- **Quality**: TDD with Jest + Supertest + RTL, GitHub Actions (`ci.yml`) running tests for the three packages.

---

## Repository Layout

| Path | Description |
| --- | --- |
| `back-end/` | NestJS API (DDD + Hex + CQRS, Swagger, Jest unit/e2e, seed script) |
| `front-end/` | React + Vite client (FSD, Redux, React Query, RTL, Storybook) |
| `order-notification-lambda/` | Serverless service (SNS + Mongo, Jest tests) |
| `example/` | Screenshots used in the challenge instructions |
| `.github/workflows/ci.yml` | GitHub Actions pipeline (pnpm install + tests per package) |

---

## Architecture Overview

- **Domain Driven Design** for the backend: entities, repositories, and ports live in `src/domain`. Infrastructure adapters implement the ports (Mongo repositories, AWS S3 client, order notification adapter). CQRS handlers run the business logic.
- **Feature-Sliced React**: shared providers in `src/app`, domain entities in `src/entities`/`src/features`, widgets/pages assemble the flows, and the same components are documented in Storybook.
- **Serverless Lambda**: use-cases receive ports (Mongo repo + SNS publisher). `handler.ts` wires the dependencies, `main.ts` exports the functions. Responses/errors are centralized.
- **LocalStack** provides S3 + SNS locally; Docker Compose spins up backend, frontend, lambda, Mongo, and LocalStack with a single command.

---

## Local Development

1. **Create `.env` from `.env.example.txt`** at the repo root (Docker Compose loads it for every service).  
   You can add overrides in each package if needed, but the single root file is enough.

2. **Start everything**:
   ```bash
   docker-compose up --build
   ```
   - Frontend: http://localhost:5173  
   - Backend API & Swagger: http://localhost:3000 / http://localhost:3000/docs  
   - Lambda (serverless-offline): http://localhost:4000  
   - LocalStack: http://localhost:4566

3. **Manual runs (optional)**:

   ```bash
   # back-end/
   pnpm install
   pnpm start:dev        # Nest API
   pnpm migrate          # seed Mongo with categories/products/orders
   pnpm test             # unit tests
   pnpm test:e2e         # supertest + mongodb-memory-server

   # front-end/
   pnpm install
   pnpm dev              # Vite dev server
   pnpm storybook        # Storybook components
   pnpm test             # Jest + RTL

   # order-notification-lambda/
   pnpm install
   pnpm test             # Jest (use-cases)
   pnpm offline          # serverless-offline (port 4000)
   ```

---

## Environment Variables

The root `.env.example.txt` already contains a working configuration:

```env
# AWS / LocalStack
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
LOCALSTACK_ENDPOINT=http://localstack:4566
S3_BUCKET=my-bucket
SNS_TOPIC_NAME=test-sns-topic
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:test-sns-topic

# Mongo
MONGO_URI=mongodb://mongo:27017/nouslatam

# Backend
HOST=0.0.0.0
PORT=3000
API_FRONTEND=http://localhost:5173
S3_ENDPOINT=http://localstack:4566
S3_ENDPOINT_HOST_MY_BUCKET=http://localhost:4566
API_LAMBDA=http://localstack-lambda-app:4000/dev/order/notification

# Frontend
VITE_API_URL=http://localhost:3000

# Lambda
NODE_ENV=development
LOCALSTACK_HOST=localstack
SERVICES=sns,s3,lambda
DEBUG=1
```

Copy it to `.env` before running Docker:
```bash
cp env.example.txt .env
```

---

## Testing & CI

| Package | Unit tests | Integration tests |
| --- | --- | --- |
| `back-end/` | `pnpm test` (Jest + ts-jest) | `pnpm test:e2e` (Supertest + mongo-memory-server) |
| `front-end/` | `pnpm test` (Jest + React Testing Library) | – (UI integration handled via RTL mocks) |
| `order-notification-lambda/` | `pnpm test` (ts-jest) | – (handlers covered via mocked ports) |

Continuous Integration: `.github/workflows/ci.yml`
- Uses `pnpm` in each package.
- Runs backend unit + e2e, frontend unit, lambda unit.
- Secrets (if provided) override env defaults: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `MONGO_URI`.

---

## API, Frontend & Lambda Features

### Backend (NestJS)
- Products, Categories, Orders CRUD (multipart upload for product images, stored in LocalStack S3).
- Dashboard aggregates (`/dashboard`) filter by product/category/date period.
- DTO validation + centralized errors + Swagger docs at `/docs`.
- Seed script `pnpm migrate`.
- CQRS handlers + domain events + AWS S3 port + lambda notification port.

### Frontend (React)
- Pages: Products, Categories, Orders, Dashboard (KPI charts with Recharts).
- Redux Toolkit for UI state (drawer, global UI).
- React Query for data fetching/mutations (hooks under `src/shared/api/hooks.ts`).
- Storybook documenting tables and forms.
- Vite dev server & build.

### Lambda (Serverless Framework)
- `POST /order/notification`: validates payload, reads Mongo, publishes SNS (or logs fallback).
- `POST /reports/sales` + cron: aggregates orders from last 24h and publishes SNS report.
- Use-cases rely on ports (Mongo repository + SNS adapter).
- Jest tests mock the ports to perform TDD.

---

## Extra Docs

- `back-end/README.md`: NestJS architecture, scripts, Swagger/TDD details.
- `front-end/README.md`: FSD structure, commands, Storybook/test instructions.
- `order-notification-lambda/README.md`: lambda architecture, env, testing.
- `documents/README.md`: Original challenge statement (Portuguese).

---

## Original Challenge Requirements (fulfilled)

1. **Backend (NestJS + MongoDB)** – Products/Categories/Orders CRUD, dashboard aggregations, DTO validation, seed script.
2. **Asynchronous Task (Serverless Framework)** – Order notification + sales report lambda with HTTP + cron triggers.
3. **Frontend (React + MUI + Storybook)** – CRUD screens, KPI dashboard, documented components.
4. **AWS Integration (LocalStack)** – S3 for image upload, SNS for lambda, Docker Compose bringing everything up locally.

Everything above is implemented, tested, and documented in English. Feel free to open issues or PRs to extend it further. Enjoy!
