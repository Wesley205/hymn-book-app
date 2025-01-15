const express = require('express');
const appController = require('../controllers/appController');  // Import merged controller

const router = express.Router();

// Hymn Routes
router.post('/hymns', appController.addHymn);  // Add a new hymn
router.get('/hymns/:id', appController.getHymnById);  // Get a hymn by ID
router.put('/hymns/:id', appController.updateHymn);  // Update hymn lyrics
router.get('/hymns', appController.getAllHymns); // List all hymns

// Favorite Routes
router.post('/favorites', appController.addFavorite);  // Add a new favorite
router.delete('/favorites', appController.removeFavorite);  // Remove a favorite
router.get('/favorites/:userId', appController.getUserFavorites);  // Get all favorites for a user

module.exports = router;
