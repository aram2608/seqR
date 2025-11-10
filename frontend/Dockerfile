# Dockerfile (production)
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ARG CLIENT_API_KEY
ENV VITE_CLIENT_API_KEY=$CLIENT_API_KEY

RUN bun run build

# Build static site
FROM nginx:stable-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]