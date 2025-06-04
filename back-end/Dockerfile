FROM node:23

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the dependency files
COPY package*.json ./

# Install the project dependencies
RUN npm install --force

# Copy all files to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Default command to start the application
CMD npm run migrate && npm run start
