const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const hymnRoutes = require('./routes/hymnRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');
const { sequelize } = require('./config/db');
const redis = require('redis');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Set up routes
app.use('/api/v1', hymnRoutes); // Hymn-related routes
app.use('/api/v1', favoriteRoutes); // Favorites-related routes

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
