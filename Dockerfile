# 1. Install production dependencies
FROM node:20-alpine AS deps
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# 2. Build the application
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# 3. Production image
FROM node:20-alpine AS runner
WORKDIR /app
# Install SSH client
RUN apk add --no-cache openssh-client

# Copy built app and dependencies
COPY --from=builder /app/build ./build
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

# Copy the startup script
COPY start-and-tunnel.sh .

# Mount the SSH key secret during build and copy it to the correct location.
# The key will NOT be in the final image layers.
RUN --mount=type=secret,id=ssh_key,dst=/tmp/ssh_key mkdir -p /root/.ssh && cat /tmp/ssh_key > /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa

# Install pnpm for the start script
RUN npm install -g pnpm

# Set the entrypoint to our new script
ENTRYPOINT ["./start-and-tunnel.sh"]
CMD []