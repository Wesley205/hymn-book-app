require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
  },
  server: {
    port: process.env.PORT || 3307,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
