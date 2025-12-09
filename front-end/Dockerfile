FROM node:23

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the dependency files to take advantage of caching
COPY package*.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the source code
COPY . .

# Expose development ports: Vite (5173) and Storybook (6007)
EXPOSE 5173
EXPOSE 6007

# Command to run the Vite development server by default
CMD ["npm", "run", "dev"]