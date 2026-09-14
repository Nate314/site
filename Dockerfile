# syntax=docker/dockerfile:1

# --- Stage 1: build the Angular app ---
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# Copy the rest of the source and build for production
COPY . .
RUN npx ng build

# --- Stage 2: serve the built app with nginx ---
FROM nginx:alpine AS runtime

# Angular's outputPath (base: "docs", browser: "") writes static files
# directly into docs/, so that's what gets served.
COPY --from=build /app/docs /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
