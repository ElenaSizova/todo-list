# Create image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . .
 
# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["npm", "start"]