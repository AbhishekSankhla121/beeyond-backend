FROM node:22-alpine AS deps

RUN apk add --no-cache git libc6-compat

WORKDIR /beeyond-backend
COPY package*.json ./

# Install only production deps
RUN npm ci

FROM node:22-alpine AS runner

RUN apk add --no-cache git libc6-compat

WORKDIR /beeyond-backend

COPY --from=deps /beeyond-backend/node_modules ./node_modules
COPY . .
RUN rm -f .env

RUN addgroup -g 1001 backend \
 && adduser -D -u 1001 -G backend backend

USER backend

EXPOSE 5000

CMD ["node", "index.js"]
