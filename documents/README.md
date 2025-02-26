
---

### How to Start LocalStack Using Docker

To run LocalStack locally using Docker, follow these steps:

1. **Clone the Repository**:
   Clone the project to your local machine:
   ```bash
   git clone https://github.com/Vidigal-code/nslt-challenge
   cd nslt-challenge/localstack
   ```

2. **Check `docker-compose.yml`**:
   Make sure the `docker-compose.yml` file is set up correctly with the necessary configurations for the LocalStack service.

3. **Start LocalStack**:
   Run the following command to start LocalStack with Docker Compose:
   ```bash
   docker-compose up
   ```
   This will start the LocalStack container locally.

4. **Interact with Simulated AWS Services**:
   Once LocalStack is running, you can interact with simulated AWS services (like S3, DynamoDB, Lambda) via the AWS CLI or SDKs.

5. **Stop LocalStack**:
   To stop LocalStack, run:
   ```bash
   docker-compose down
   ```

---

This sets up LocalStack to simulate AWS services locally for development and testing purposes.