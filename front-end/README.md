# Frontend (React + Vite + Feature-Sliced Design)

The web client is a **React 19 + Vite** application styled with **Material UI**. State is managed with **Redux Toolkit** (for UI concerns such as drawer state) and **React Query** (server cache). Components are organized following Feature-Sliced Design and documented in Storybook. Jest + React Testing Library cover tables, forms, and hooks.

## Structure

```
src/
 ├── app/           # providers (Redux, QueryClient), store, global styles
 ├── shared/        # API client/hooks, utilities, UI models
 ├── components/    # low-level tables/forms reused across pages
 ├── pages/         # Products, Categories, Orders, Dashboard
 ├── stories/       # Storybook stories for tables/forms
 └── tests/         # RTL/Jest specs
```

## Available Scripts

```bash
pnpm install
pnpm dev            # Vite dev server on http://localhost:5173
pnpm build          # production build
pnpm serve          # preview the build
pnpm storybook      # Storybook on http://localhost:6007 (cache cleaned, no manager cache)
pnpm build-storybook
pnpm test           # Jest + React Testing Library
```

Tests include:
- `productTable.test.tsx` (renders list rows),
- `productForm.test.tsx` and `orderForm.test.tsx` (submit flows using mocked React Query mutations),
- `smoke.test.js` (ensures Jest runs under the current config).

## Environment Variables

Only one variable is required:

```env
VITE_API_URL=http://localhost:3000
```

Copy it to `front-end/.env` or rely on the root `.env` provided by Docker Compose.

## Feature Summary

- **Products**: list/create/edit/delete, image upload (S3 URL is displayed in the table/avatar).
- **Categories** & **Orders**: CRUD flows equal to the backend requirements.
- **Dashboard**: KPI cards + charts (Recharts) with filters for product, category, date range, and aggregation period (daily/weekly/monthly).
- **Storybook**: tables and forms documented for handoff (`pnpm storybook`).

> Tip: The Storybook script now wipes stale caches and disables the manager cache to avoid "Loading chunk ... failed" errors. If you still see it, rerun `pnpm storybook` so it rebuilds fresh.

## Testing & CI

`pnpm test` runs Jest with `--experimental-vm-modules` to support ESM. The root GitHub Actions workflow (`.github/workflows/ci.yml`) executes this command on every push/PR.

## Linking with the Backend

All data hooks live in `src/shared/api/hooks.ts` and wrap Axios calls with React Query. When `VITE_API_URL` points to the NestJS API (default `http://localhost:3000`), the UI consumes the local backend seamlessly—including file uploads to LocalStack S3.

For screenshots of each page, check `example/front-end-example-files/`.
