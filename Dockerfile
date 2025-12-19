FROM node:22-alpine AS deps

# Required for some native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependency files 
COPY package*.json ./

# Install dependencies
RUN npm ci

# Runtime stage
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Create non-root user
RUN addgroup -g 1001 backend \
 && adduser -D -u 1001 -G backend backend

# Switch to non-root user
USER backend

# Expose backend port
EXPOSE 5000

# Start application
CMD ["npx", "nodemon", "index.js"]
