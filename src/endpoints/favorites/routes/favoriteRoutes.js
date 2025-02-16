const express = require('express');
const appController = require('../controllers/favoriteController');  

const router = express.Router();


router.post('/favorites', appController.addFavorite);  // Add a new favorite
router.delete('/favorites/:userId/:hymnId', appController.removeFavorite);  // Remove a favorite
router.get('/favorites/:userId', appController.getUserFavorites);  // Get all favorites for a user
router.get('/favorites', appController.getAllFavorites);  // Get all favorites for a user

module.exports = router;