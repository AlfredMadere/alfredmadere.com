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
COPY --from=builder /app/build ./build
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

RUN npm install -g pnpm

ENTRYPOINT ["pnpm"]
CMD ["start"]