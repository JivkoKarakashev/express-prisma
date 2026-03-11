# ---------- Base ----------
FROM node:24-alpine AS base
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ---------- Development ----------
FROM deps AS dev
WORKDIR /app
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

# ---------- Build ----------
FROM deps AS build
COPY . .
# DATABASE_URL will come from docker-compose env_file

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# ---------- Production ----------
FROM node:24-alpine AS prod
WORKDIR /app

# Copy only needed files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

# Remove devDependencies
RUN npm prune --omit=dev

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "dist/index.js"]