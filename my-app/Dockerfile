FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the .env file is included in the build
COPY .env .env

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
