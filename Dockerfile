# ---------- Base ----------
FROM node:24-alpine AS base
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps
COPY package*.json ./
RUN npm install

# ---------- Build ----------
FROM deps AS build
COPY . .
# DATABASE_URL will come from docker-compose env_file
RUN npx prisma generate
RUN npm run build

# ---------- Production ----------
FROM node:24-alpine AS prod
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]