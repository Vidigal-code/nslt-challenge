
---

# Backend Specification (NestJS + MongoDB)

## Version: 3.0.1 (02/01/24)

```bash
docker run -d --name localstack -p 4566:4566 -e DOCKER_HOST=unix:///var/run/docker.sock -e SERVICES=sns,s3,sts -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd)/tmp/localstack:/var/lib/localstack --network localstack-network localstack/localstack:latest
```

---

### Back-end `.env` File

For a back-end application, such as an Express server, environment variables help configure important services, ports, and other server-related settings.

**Example of a Back-end `.env` file:**


```bash
HOST=localhost
PORT=3000
HTTPS=false
API_FRONTEND=http://localhost:5173
AWS_REGION=us-east-1
S3_ENDPOINT=http://localhost:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
MONGO_URI=mongodb://127.0.0.1:27017/nouslatam
API_LAMBDA=http://localhost:4000/dev/order/notification
```
### Environment Variables

- **HOST:** Defines the hostname or IP address on which the back-end server will listen. In this example, it’s set to `localhost`, which means the server will only be accessible from the same machine it’s running on.
- **PORT:** Defines the port on which the back-end server will listen. In this example, it’s set to port `3000`.
- **HTTPS:** This indicates whether the server should use HTTPS. In this case, it’s set to `false` (non-HTTPS).
- **API_FRONTEND:** Specifies the front-end URL. In this case, it's the URL of the front-end app running locally (e.g., `http://localhost:5173`).
- **AWS_REGION:** Defines the AWS region for the application. In this example, it’s set to `us-east-1`.
- **S3_ENDPOINT:** Configures the endpoint for AWS S3 storage. This might be configured for a local S3 mock server (e.g., `http://localhost:4566` for LocalStack).
- **AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:** These are the AWS credentials required for accessing services like S3. In a local development environment, they are often set to dummy values.
- **MONGO_URI:** Defines the connection string for MongoDB. In this example, it connects to a local MongoDB instance (e.g., `mongodb://127.0.0.1:27017/nouslatam`).

### Steps to Create a `.env` File

1. **Create the file:**
   - In the root directory of your project, create a new file named `.env` (without any file extension).

2. **Add your variables:**
   - Open the `.env` file in a text editor and add your environment variables in the `KEY=VALUE` format. Ensure each key-value pair is on its own line.

3. **Use the variables in your code:**
   - In the application code, you can access the environment variables using `process.env.KEY_NAME`. For example, in Node.js:

   ```javascript
   const apiUrl = process.env.VITE_API_URL;
   ```

4. **Never commit the `.env` file to source control (Git):**
   - The `.env` file often contains sensitive information. Make sure to add it to your `.gitignore` file to prevent it from being committed to version control.

   ```bash
   # .gitignore
   .env
   ```

---

Sure! Here's the explanation for each script in your `package.json` file in Markdown format.

```markdown
# Scripts in `package.json`

Here are the detailed explanations for each script defined in the `package.json` file.

## 1. `prebuild`
```bash
"prebuild": "rimraf dist"
```
- **What it does:** Before the build process starts, the `prebuild` script runs the `rimraf dist` command, which deletes the `dist` folder (where the transpiled code is stored). This ensures that you always start with a clean version of the `dist` directory.

## 2. `build`
```bash
"build": "nest build"
```
- **What it does:** This script runs the `nest build` command to compile the NestJS application. It transpiles TypeScript files into JavaScript and prepares the project for production or running.

## 3. `start`
```bash
"start": "nest start"
```
- **What it does:** This script starts the NestJS application in development mode. It executes the `nest start` command, which will run the application without watching for file changes.

## 4. `start:dev`
```bash
"start:dev": "nest start --watch"
```
- **What it does:** This script runs the NestJS application in development mode with the `--watch` flag. It watches for changes in the source files and automatically reloads the application when changes are detected. It's useful for active development.

## 5. `start:prod`
```bash
"start:prod": "node dist/main"
```
- **What it does:** This script starts the application in production mode. It runs the `node dist/main` command, which starts the precompiled application (from the `dist` folder) in a production environment.

## 6. `lint`
```bash
"lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
```
- **What it does:** This script runs ESLint to lint the TypeScript files in the `src`, `apps`, `libs`, and `test` directories. The `--fix` flag automatically fixes fixable linting issues in the code.

## 7. `test`
```bash
"test": "jest"
```
- **What it does:** This script runs Jest to execute unit tests. It will find and run all the test files in the project based on the default Jest configuration.

## 8. `test:watch`
```bash
"test:watch": "jest --watch"
```
- **What it does:** This script runs Jest in watch mode. Jest will watch for file changes and re-run the tests automatically whenever a change is made to the codebase.

## 9. `test:cov`
```bash
"test:cov": "jest --coverage"
```
- **What it does:** This script runs Jest and generates a code coverage report. It will track which lines of code are covered by tests and output a report indicating the coverage percentage.

## 10. `test:debug`
```bash
"test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
```
- **What it does:** This script runs Jest in debug mode. The `--inspect-brk` flag allows you to debug the test process with the Node.js debugger. The `--runInBand` option ensures Jest runs tests serially, rather than in parallel, which is often required when debugging. Additionally, `ts-node/register` is used to transpile TypeScript files on the fly during testing.

## 11. `test:e2e`
```bash
"test:e2e": "jest --config ./test/jest-e2e.json"
```
- **What it does:** This script runs end-to-end (E2E) tests using Jest, but with a specific configuration file (`jest-e2e.json`). E2E tests are typically used to test the application as a whole, ensuring all components work together as expected.

## 12. `migrate`
```bash
"migrate": "ts-node scripts/migrate.ts"
```
- **What it does:** This script runs a TypeScript migration script (`migrate.ts`). It uses `ts-node` to execute TypeScript code directly, which is useful for running database migrations or other scripts in a TypeScript-based project.
```

This markdown breakdown should give you a good understanding of each script and its purpose! Let me know if you need further details.

### 1.1. Entities

#### 1.1.1. Product

Example fields:

- `id` (string or ObjectId)
- `name` (string)
- `description` (string)
- `price` (number)
- `categoryIds` (array of IDs) — many-to-many relationship with Category
- `imageUrl` (string) — pointing to the file in S3

```typescript
import { ObjectId } from 'mongoose';

export class Product {
  id: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryIds: ObjectId[];
  imageUrl: string;
}
```

#### 1.1.2. Category

Example fields:

- `id` (string or ObjectId)
- `name` (string)

```typescript
import { ObjectId } from 'mongoose';

export class Category {
  id: ObjectId;
  name: string;
}
```

#### 1.1.3. Order

Example fields:

- `id` (string or ObjectId)
- `date` (Date)
- `productIds` (array of Product IDs)
- `total` (number)

```typescript
import { ObjectId } from 'mongoose';

export class Order {
  id: ObjectId;
  date: Date;
  productIds: ObjectId[];
  total: number;
}
```

**Note:**  
The relationship between Product and Category is many-to-many.
- Each Product can belong to multiple Categories.
- Each Category can contain multiple Products.  
  The relationship between Product and Order is many-to-one (one order can contain many products).

---

### 1.2. Endpoints

#### 1.2.1. CRUD Operations for Each Entity

- **Product:**
  - `POST /products` — Create a new product
  - `GET /products` — List all products
  - `PUT /products/:id` — Update a product by ID
  - `DELETE /products/:id` — Delete a product by ID

- **Category:**
  - `POST /categories` — Create a new category
  - `GET /categories` — List all categories
  - `PUT /categories/:id` — Update a category by ID
  - `DELETE /categories/:id` — Delete a category by ID

- **Order:**
  - `POST /orders` — Create a new order
  - `GET /orders` — List all orders
  - `PUT /orders/:id` — Update an order by ID
  - `DELETE /orders/:id` — Delete an order by ID

- **Dashboard:**
  - `GET /dashboard` — Display aggregated sales data with filters by category, product, and period.  
    **Implement aggregate queries** to obtain order metrics:
  - Total Orders
  - Average Order Value
  - Total Sales by Product
  - Total Sales by Category
  - Average Order Total

---

### 1.3. Relationships

- **Product and Category:**
  - Many-to-many relationship.
  - Implement a join table or embedded references to associate Products with Categories. A product can belong to multiple categories, and a category can contain multiple products.

- **Product and Order:**
  - Many-to-one relationship.
  - A product can be part of many orders. Use an array of product IDs to represent this in the Order entity.

---

### 1.4. Mass Data Script

- **Create a script (CLI in Node.js)** that populates the database with fictitious data:
  - **Products**: Populate with price and category variations.
  - **Categories**: Populate with different types of categories (e.g., Electronics, Fashion, Groceries).
  - **Orders**: Populate with various combinations of products, dates, and totals.

---

### 1.5. Validations

- **DTOs for Each Route**:  
  Use **DTOs** (Data Transfer Objects) for validation to ensure data integrity and security.

- **Correctly Manage Deletions**:  
  When deleting a Category, ensure that products are either:
  - Removed from the database if they are orphaned,
  - Or their `categoryIds` are updated to remove the reference to the deleted Category.

- **Error Handling**:  
  Ensure that error handling is consistent and clear. Return:
  - Adequate HTTP status codes (e.g., 200 for success, 400 for bad requests, 404 for not found, etc.).
  - A standardized JSON error response with an appropriate message.

Example of an error response:

```json
{
  "statusCode": 400,
  "message": "Product not found",
  "error": "Bad Request"
}
```

--- 

