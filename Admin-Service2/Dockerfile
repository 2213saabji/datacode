# Use official Node.js image as the base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json .

# Install dependencies
RUN npm install -f

# Copy all files from the current directory to /app in the container
COPY . .

# Ensure the entrypoint script has execute permissions
RUN chmod +x docker-entrypoint.sh

# Build your application with Vite
RUN npm run build

# Stage 2: Use a smaller base image for serving your application
FROM nginx:alpine

# Copy the built app from the previous stage into the nginx image
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy the entrypoint script and set permissions
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 80 to the outside world
EXPOSE 80

# Use the custom entrypoint script
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Start nginx server to serve the static content
CMD ["nginx", "-g", "daemon off;"]
