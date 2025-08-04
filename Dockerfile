# 0. Base image with pnpm installed
FROM node:20-alpine AS base
RUN npm install -g pnpm

# 1. Install production dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# 2. Build the application
FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# 3. Production image
FROM base AS runner
WORKDIR /app
RUN apk add --no-cache openssh-client

# Copy built app and dependencies
COPY --from=builder /app/build ./build
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

# Copy the startup script
COPY start-and-tunnel.sh .

# Set the entrypoint to our new script
ENTRYPOINT ["./start-and-tunnel.sh"]
CMD []