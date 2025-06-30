FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf ./*
COPY --from=builder /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
