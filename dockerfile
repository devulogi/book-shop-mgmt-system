FROM node:19-alpine

# Create app directory
WORKDIR /app

# Copy package.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 5050

# Start the app
CMD ["npm", "run", "dev"]
