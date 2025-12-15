# Use Node 22
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Create non-root user (Debian way)
RUN groupadd -g 1001 backend \
 && useradd -u 1001 -g backend -m -s /bin/bash backend

# Switch to non-root user
USER backend

# Expose backend port
EXPOSE 5000

# Use nodemon for live reload
CMD ["npx", "nodemon", "index.js"]