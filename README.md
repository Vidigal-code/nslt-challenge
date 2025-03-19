# Full Stack Challenge

## General Objective
Develop a full-stack application that integrates **NestJS**, **MongoDB**, **ReactJS**, and **AWS** (using LocalStack only for S3), employing **TypeScript**, **Serverless Framework** (for Lambda), and **Docker**.

The scope should be achievable within 4 hours.

link youtube test: https://www.youtube.com/watch?v=LcUjX-c-HEA

---
# Front-end .env

Sure! Here's an explanation for creating a `.env` file in markdown format:

---

# How to Create a `.env` File

A `.env` file is used to store environment variables that are important for configuring your application. These variables are typically used to store sensitive information, such as API keys, database connection strings, and other configuration settings that differ between development, staging, and production environments.

### Front-end `.env` File

For a front-end application, such as a React app, you may need to set environment variables that configure API endpoints and other settings.

**Example of a Front-end `.env` file:**

```bash
VITE_API_URL=http://localhost:3000
```

- **VITE_API_URL:** This specifies the API endpoint the front-end application will communicate with. It could point to your back-end server, usually set to a local development server (e.g., `http://localhost:3000`) during development.

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

This is how you can create and use a `.env` file to store and manage environment-specific configuration settings for your application.

---


## 1. Backend (NestJS + MongoDB)

### 1.1. Entities

- **Product**
    - Fields:
        - `id` (string or ObjectId)
        - `name` (string)
        - `description` (string)
        - `price` (number)
        - `categoryIds` (array of Category IDs) — many-to-many relationship with Category
        - `imageUrl` (string) — points to the file in S3

- **Category**
    - Fields:
        - `id` (string or ObjectId)
        - `name` (string)

- **Order**
    - Fields:
        - `id` (string or ObjectId)
        - `date` (Date)
        - `productIds` (array of Product IDs)
        - `total` (number)

---

### 1.2. Endpoints

- **Product** CRUD:
    - Create, List, Update, Delete
- **Category** CRUD:
    - Create, List, Update, Delete
- **Order** CRUD:
    - Create, List, Update, Delete
- **Dashboard**:
    - Display aggregated sales data with filters for category, product, and period.
    - Implement aggregate queries for sales metrics (e.g., total orders, average value, etc.).

#### Relationships:
- Associate Products with Categories (many-to-many).
- Associate Products with Orders.

---

### 1.3. Data Population Script

- Create a script (e.g., CLI in Node.js) to populate MongoDB with fictitious data:
    - **Products** (with price variations and categories)
    - **Categories** (different types)
    - **Orders** (varied combinations of products, dates, and totals)

---

### 1.4. Validations

- Use **DTOs** (Data Transfer Objects) to validate each route, ensuring data integrity and security.
- Properly manage deletions (e.g., when deleting a Category, make sure Products do not become orphaned).
- Implement error handling (correct status codes and JSON response structure).

---

## 2. Asynchronous Task (Serverless Framework)

### 2.1. Lambda Function

- Create a function using the **Serverless Framework** to perform a background task, such as:
    - Processing sales reports (based on Orders)
    - Sending notifications when a new Order is created
    - Any other relevant background functionality for the business

### 2.2. Integration

- Explain how the Lambda function could be triggered (event, cron, HTTP request).
- If applicable, demonstrate how the Lambda can read data from MongoDB or integrate with the NestJS backend.

> **Note:** No need for LocalStack for Lambda. The Lambda function should be configured only via the **Serverless Framework**.

---

## 3. Front-end (React + Material UI + Storybook)

### 3.1. Main Pages

- **Products**
    - List, Create, Edit, Delete.
    - Image upload (stored in S3).

- **Categories**
    - List, Create, Edit, Delete.

- **Orders**
    - List, Create, Edit, Delete.

### 3.2. KPI Dashboard

- Display sales metrics about Orders, such as:
    - Total number of orders
    - Average order value
    - Total revenue
    - Orders by period (daily, weekly, monthly, etc.)

### 3.3. Component Documentation

- Use **Storybook** to document at least 2 main components:
    - Table (for listing Products, Orders, or Categories)
    - Form (for creating/editing)

---

## 4. Integration with AWS (LocalStack for S3)

### 4.1. Local Configuration

- Use **LocalStack** only to simulate S3 in the local environment.
- Upload Product images to the simulated S3 bucket.
- Configure **Docker** (using **docker-compose** or similar) to spin up both LocalStack and your NestJS and React applications.

### 4.2. S3 Access

- Ensure the application can upload files to the S3 bucket and retrieve the image URL (to display in the front-end).

---

This challenge involves setting up both the backend and frontend in a cohesive manner, ensuring proper integration with AWS services, and handling critical aspects like validation, error handling, and background processing using Serverless Framework.
