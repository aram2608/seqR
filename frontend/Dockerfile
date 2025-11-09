# Dockerfile (production)
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Build static site
FROM nginx:stable-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN echo 'server { \
  listen 3000; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
