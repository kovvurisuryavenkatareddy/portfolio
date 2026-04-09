#
# Production Docker image for this React (CRA) portfolio.
# - Stage 1: Build static assets using Node.js 22
# - Stage 2: Serve via Nginx with SPA routing
#

FROM node:22-alpine AS build
WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY public ./public
COPY src ./src
COPY tailwind.config.js ./
COPY README.md ./

ENV NODE_ENV=production
RUN npm run build


FROM nginx:1.27-alpine AS runtime

# Nginx SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static site
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

