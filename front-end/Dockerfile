FROM node:23

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the dependency files to take advantage of caching
COPY package*.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the source code
COPY . .

# Expose the default Vite port (3000)
EXPOSE 3000

# Command to run the Vite development server
CMD ["npm", "run", "dev"]