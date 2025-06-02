# MongoDB Docker Setup

This project provides a simple setup to run MongoDB version 6.0 using Docker Compose.

## How it works

- The MongoDB service runs inside a Docker container using the official `mongo:6.0` image.
- The database listens on the default port `27017`, which is mapped to the host machine so you can connect to it from your local environment.
- An initialization script (`mongo-init.js`) is mounted inside the container. This script runs once when the container is created and can be used to create databases, users, and collections.
- The database data is persisted in a Docker named volume (`mongo_data`) to ensure data is not lost when the container is stopped or removed.
- The MongoDB container is connected to a Docker network (`app-network`) so it can communicate with other containers (like backend apps) if needed.

## Getting started

1. Make sure you have Docker and Docker Compose installed.

2. Place your `mongo-init.js` initialization script in the same folder as the `docker-compose.yml`.

3. Run the following command to start MongoDB:

   ```bash
   docker-compose up -d