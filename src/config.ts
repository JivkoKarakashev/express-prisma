const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.LISTENING_PORT ?? '3000'),
  DATABASE_URL: process.env.DATABASE_URL?.replace('postgresql', 'postgres')
}

export default config;