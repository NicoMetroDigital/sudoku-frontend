# ---- STAGE 1: Build mit Node ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- STAGE 2: Serve mit Nginx ----
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
