FROM node:18-alpine AS core

WORKDIR /app
COPY package*.json ./

FROM core AS builder
COPY . .
RUN npm ci --development
RUN npm run build

FROM core AS production
COPY --from=builder /app/dist ./
RUN npm ci --production --ignore-scripts \
    && chown node src

LABEL Description="otus-highload"
USER node
EXPOSE 8000

CMD node src/main
