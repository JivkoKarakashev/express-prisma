# Docker

### Start Docker Containers in development environment
`docker-compose --env-file .env.development -f docker-compose.yml -f docker-compose.dev.yml up --build`

### Start Docker Containers in production environment
`docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up --build`