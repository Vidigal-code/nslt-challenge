FROM node:18-slim

# Install useful dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install AWS CLI version 2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws

# Install Serverless framework and awslocal globally with npm
RUN npm install -g serverless@3.40.0 --force

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project files into the container's working directory
COPY . .

# Normalize line endings and make entrypoint executable
RUN sed -i 's/\r$//' ./entrypoint.sh && \
    sed -i 's/\r$//' ./serverless.yml || true && \
    chmod +x ./entrypoint.sh

# Install project dependencies, forcing npm to resolve any conflicts
RUN npm install --force

# Expose port 4000 for serverless-offline to listen on
EXPOSE 4000

# Default command to run when the container starts (bash needed for pipefail)
ENTRYPOINT ["bash", "./entrypoint.sh"]