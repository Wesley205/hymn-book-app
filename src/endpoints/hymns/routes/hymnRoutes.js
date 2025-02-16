const express = require('express');
const appController = require('../controllers/hymnController');  // Import merged controller

const router = express.Router();

// Hymn Routes
router.post('/hymns', appController.addHymn);  // Add a new hymn
router.get('/hymns/:id', appController.getHymnById);  // Get a hymn by ID
router.put('/hymns/:id', appController.updateHymn);  // Update hymn lyrics
router.get('/hymns', appController.getAllHymns); // List all hymns
router.delete('/hymns/:id', appController.deleteHymn); //delete hymn by id


module.exports = router;
