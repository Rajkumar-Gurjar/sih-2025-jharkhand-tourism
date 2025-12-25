# =============================================================================
# JharkhandYatra Frontend - Multi-stage Docker Build
# =============================================================================
# This Dockerfile uses a multi-stage build to create a lightweight production
# image. The build stage compiles the React app, and the production stage
# serves it using nginx.
#
# Build: docker build -t jharkhand-tourism-frontend .
# Run:   docker run -p 80:80 jharkhand-tourism-frontend
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build Stage
# -----------------------------------------------------------------------------
# Uses Node.js to install dependencies and build the production bundle
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
# This allows Docker to cache the npm install step if package files haven't changed
COPY package*.json ./

# Install dependencies
# Using npm ci for reproducible builds (uses package-lock.json exactly)
RUN npm ci

# Copy source code
# This is done after npm install to leverage Docker layer caching
COPY . .

# Build arguments for environment variables at build time
# These can be passed during docker build: --build-arg VITE_API_BASE_URL=https://api.example.com
ARG VITE_API_BASE_URL
ARG VITE_POSTMAN_API_KEY

# Set environment variables for the build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_POSTMAN_API_KEY=${VITE_POSTMAN_API_KEY}

# Build the production bundle
# This creates optimized static files in the /app/dist directory
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Production Stage
# -----------------------------------------------------------------------------
# Uses nginx to serve the static files
# Alpine-based image for minimal size (~25MB)
FROM nginx:alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
# This is the magic of multi-stage builds - we only copy what we need
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP port)
EXPOSE 80

# Healthcheck to verify nginx is running and serving content
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx in foreground mode (required for Docker)
# -g 'daemon off;' keeps nginx in the foreground so Docker can track the process
CMD ["nginx", "-g", "daemon off;"]
