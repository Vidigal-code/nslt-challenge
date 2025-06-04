# Full Stack Challenge

## General Objective
Develop a full-stack application that integrates **NestJS**, **MongoDB**, **ReactJS**, and **AWS** (using LocalStack only for S3), employing **TypeScript**, **Serverless Framework** (for Lambda), and **Docker**.

The scope should be achievable within 4 hours.

link youtube test: https://www.youtube.com/watch?v=LcUjX-c-HEA


## 🛠️ Local Development Setup with Docker

This guide explains how to configure and run all services locally using Docker Compose. The setup includes:

* **Back-end** (NestJS API)
* **Front-end** (Vite + React)
* **MongoDB** (Database)
* **LocalStack** (Mock AWS services)
* **Lambda-like Notification Service** (Express server simulating AWS Lambda behavior)

---

### 1. Configure Environment Variables

#### 📁 `./order-notification-lambda/.env`

```env
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

This configuration connects to the local MongoDB and LocalStack services inside Docker and simulates AWS services like SNS, S3, and Lambda.

---

#### 📁 `./back-end/.env`

```env
HOST=localhost
PORT=3000
HTTPS=false
API_FRONTEND=http://localhost:5173
AWS_REGION=us-east-1
S3_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
MONGO_URI=mongodb://mongo:27017/nouslatam
API_LAMBDA=http://localstack-lambda-app:4000/dev/order/notification
```

This sets up the back-end to run locally and integrate with LocalStack, MongoDB, and the Lambda-like service.

---

#### 📁 `./front-end/.env`

```env
VITE_API_URL=http://localhost:3000
```

This points the front-end app to the local back-end API.

---

### 2. Run the Full Stack Locally

Use Docker Compose to spin up all services:

```bash
docker-compose up --build
```

This will:

* Build and run all containers
* Connect services through a shared Docker network
* Initialize MongoDB with data (if configured)
* Make all services available on your local machine

| Service        | URL                                            |
| -------------- | ---------------------------------------------- |
| Front-end      | [http://localhost:5173](http://localhost:5173) |
| Back-end API   | [http://localhost:3000](http://localhost:3000) |
| Lambda Service | [http://localhost:4000](http://localhost:4000) |
| LocalStack     | [http://localhost:4566](http://localhost:4566) |
| MongoDB        | mongodb://localhost:27017                      |

---

### ✅ Notes

* Make sure Docker is running before starting.
* You can stop the services using `Ctrl + C` or `docker-compose down`.
* Changes to `.env` files require a container rebuild:

  ```bash
  docker-compose down && docker-compose up --build
  ```




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
API_LAMBDA=http://localhost:4000/dev/order/notification
```


### Explanation of Environment Variables Inside a Container

When running a back-end application like an Express server **inside a Docker container**, the values of certain environment variables need to reflect the internal Docker network. Instead of using `localhost`, you reference other services by their **container names** defined in `docker-compose.yml`.

Here’s how the `.env` file would look **inside the container**:

```env
HOST=localhost
PORT=3000
HTTPS=false
API_FRONTEND=http://localhost:5173
AWS_REGION=us-east-1
S3_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
MONGO_URI=mongodb://mongo:27017/nouslatam
API_LAMBDA=http://localstack-lambda-app:4000/dev/order/notification
```

### Key Differences:

* `S3_ENDPOINT=http://localstack:4566`
  → Uses the container name `localstack` instead of `localhost`, because that's how it's accessed from within the Docker network.

* `MONGO_URI=mongodb://mongo:27017/nouslatam`
  → The hostname `mongo` refers to the MongoDB container, not the local machine.

* `API_LAMBDA=http://localstack-lambda-app:4000/dev/order/notification`
  → Refers to another container named `localstack-lambda-app`.

Using container names allows the services to correctly locate and communicate with each other **within the isolated Docker network**.

---

### Environment Variables

* **HOST:** Defines the hostname or IP address on which the back-end server will listen. In this example, it’s set to `localhost`, which means the server will only be accessible from the same machine it’s running on.
* **PORT:** Specifies the port on which the back-end server will listen. Here, it’s set to `3000`.
* **HTTPS:** Indicates whether the server should use HTTPS. In this case, it’s set to `false` (non-HTTPS).
* **API\_FRONTEND:** Specifies the URL of the front-end application. In this example, it points to the local development server (e.g., `http://localhost:5173`).
* **AWS\_REGION:** Defines the AWS region where services (like S3 or Lambda) are configured. In this case, it's set to `us-east-1`.
* **S3\_ENDPOINT:** Sets the endpoint for AWS S3. When using a mock like LocalStack, this typically points to a local address (e.g., `http://localhost:4566`).
* **AWS\_ACCESS\_KEY\_ID** and **AWS\_SECRET\_ACCESS\_KEY:** These environment variables represent the AWS credentials required to authenticate with AWS services. For local development, dummy values are usually sufficient.
* **MONGO\_URI:** Specifies the MongoDB connection string. In this case, it connects to a local MongoDB instance (e.g., `mongodb://127.0.0.1:27017/nouslatam`).
* **API\_LAMBDA:** Specifies the URL endpoint for invoking a Lambda-like service (such as one running on LocalStack). For example, `http://localhost:4000/dev/order/notification` points to a locally hosted server that simulates a Lambda function.

---

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
