# Docker file for the client
# Build with: docker build -t client .

# Use the official image as a parent image.
FROM node:18-alpine3.17

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
COPY package*.json ./

# Run the command inside your image filesystem.
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 5173


# Run the specified command within the container.
CMD [ "npm", "run", "dev" ]

# Build with: docker build -t client .
# Run in detached mode with: docker run -d -p 5173:5173 client
