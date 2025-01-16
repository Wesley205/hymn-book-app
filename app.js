// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/index"); // Import merged routes
const sequelize = require("./config/db"); // Database connection
const redisClient = require("./config/redis"); // Redis connection
const config = require("./config/config"); // General config file
const { Hymn, Favorite } = require("./models/appModel");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Set up the merged routes
app.use("/api/v1", router); // Use the merged routes for all API requests


// Sync database
async function synchronizeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Synchronize the Hymn model
    await Hymn.sync();
    await Favorite.sync();
    console.log('Hymn table synchronized.');
  } catch (error) {
    console.error('Error synchronizing the database:', error.message);
  }
}

// Connect to MySQL and Redis
async function startServer() {
  try {
    // Test MySQL connection
    await synchronizeDatabase();
    console.log("MySQL connection established.");

    // Test Redis connection
    redisClient.on("connect", () => {
      console.log("Connected to Redis");
    });

    // Start the server
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
