FROM node:18-alpine AS core
ARG NPM_TOKEN

# Install tools required for project
RUN apk add --no-cache git

WORKDIR /app
COPY package*.json .npmrc ./

FROM core AS builder
COPY . .
RUN npm ci --development
RUN npm run build

FROM core AS production
COPY --from=builder /app/dist ./
RUN npm ci --production --ignore-scripts \
    && chown node src

LABEL Description="trend-example-api"
USER node
EXPOSE 8000

CMD node src/main
