# Test Offline Example

## 2. Asynchronous Task (Serverless Framework)

This section demonstrates how to use the **Serverless Framework** to create an **AWS Lambda function** that performs an asynchronous task in the background.

### 2.1. Lambda Function

We will create a Lambda function to process **sales reports** based on **orders**. This example shows how to handle background tasks that do not require immediate user interaction.

#### Steps to Create a Lambda Function

1. **Install the Serverless Framework:**

   If you don’t have the Serverless Framework installed globally, run:

   ```bash
   npm install -g serverless
   ```

2. **Configure AWS CLI for use with Localstack (Offline):**

   Set up fake AWS credentials and region to simulate local infrastructure:

   ```bash
   aws configure set region us-east-1
   aws configure set aws_access_key_id fake-access-key
   aws configure set aws_secret_access_key fake-secret-key
   ```

3. **Create and list SNS topics in Localstack:**

   ```bash
   aws --endpoint-url=http://localhost:4566 sns create-topic --name test-sns-topic
   aws --endpoint-url=http://localhost:4566 sns list-topics
   ```

---

# Environment Variables Configuration for Serverless Framework with Localstack (Offline Setup)

This document explains the `.env` file used to configure environment variables for a local development setup using the Serverless Framework, AWS Lambda (via Localstack), and MongoDB.

---

## Overview

When developing serverless applications offline with **Localstack** (a fully functional local AWS cloud stack) and **MongoDB** running locally, you need to properly configure your environment to simulate AWS services and database connections.

The `.env` file stores sensitive and configurable values such as database connection strings and AWS credentials. These values are loaded by your application and the Serverless Framework to connect to local services correctly.

---

## `.env` File Contents

```bash
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/nouslatam
SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:test-sns-topic
SNS_TOPIC_NAME=test-sns-topic
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
```