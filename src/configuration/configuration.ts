export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'mongodb://localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'example',
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    organization: process.env.GITHUB_ORGANIZATION_NAME
  }
});
