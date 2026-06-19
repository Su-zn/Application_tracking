FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json prisma.config.ts ./
RUN npm install

COPY prisma/ ./prisma/
RUN npx prisma generate

COPY src/ ./src/
RUN npx tsc

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm install prisma

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/server.js"]
