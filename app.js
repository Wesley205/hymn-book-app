const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');  // Import merged routes
const { sequelize } = require('./config/db');
const redis = require('redis');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Set up the merged routes
app.use('/api/v1', routes); // Use the merged routes for all API requests

// Connect to MySQL and Redis
async function startServer() {
  try {
    // Test MySQL connection
    await sequelize.authenticate();
    console.log('MySQL connection established.');

    // Test Redis connection
    const client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

startServer();
