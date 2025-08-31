# syntax=docker/dockerfile:1

# Base image for all stages
FROM node:24-alpine AS base
WORKDIR /app
ENV NUXT_PORT=3000

# Install pnpm globally
RUN npm install -g pnpm@latest
RUN chown -R node:node /app
USER node

# Dependency installation stage
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Development stage (hot reload enabled)
FROM base AS dev
USER root
RUN apk add --no-cache python3 make g++ sqlite-dev
USER node
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "nuxt", "dev"]

# Production build stage
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Production runtime stage
FROM base AS production
ENV NODE_ENV=production
# Install supervisor for process monitoring
RUN apk update && apk add --no-cache supervisor
# Copy supervisor configuration
COPY ./supervisord.conf /etc/supervisord.conf
COPY --from=build /app/.output ./.output
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
# Start Nuxt with supervisor
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
