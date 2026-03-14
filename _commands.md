# Prisma

### Install Prisma and Prisma Client
`npm install -D prisma`
`npm install prisma @prisma/client`

### Initialize Prisma (Creates the prisma/directory and schema prisma)
`npx prisma init`

### Generate Prisma Migrations
`npx prisma migrate dev --name init`

### Apply Prisma Migrations (to update our database)
`npx prisma migrate deploy`

### Generate Prisma Client
`npx prisma generate`

### Start Prisma Studio (optional, for inspecting our database)
`npx prisma studio --browser none --port 5555`

# Docker

## Start Docker Containers in development environment
`docker-compose --env-file .env.development -f docker-compose.yml -f docker-compose.dev.yml up --build`

## Start Docker Containers in production environment
`docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up --build`

### Log into the Express API container
`docker exec -it express_api /bin/sh`

# Postgres

### Log into the Postgres container
`docker exec -it postgres_db /bin/bash`

### Inspect Tables in the Database
`\dt`

### Describe a Specific Table
`\d category`