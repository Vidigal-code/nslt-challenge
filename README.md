# Full Stack Challenge

## General Objective
Develop a full-stack application that integrates **NestJS**, **MongoDB**, **ReactJS**, and **AWS** (using LocalStack only for S3), employing **TypeScript**, **Serverless Framework** (for Lambda), and **Docker**.

The scope should be achievable within 4 hours.

link youtube test: https://www.youtube.com/watch?v=LcUjX-c-HEA

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
