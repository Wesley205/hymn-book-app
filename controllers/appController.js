const appService = require('../services/appService');
const NotFoundError = require('../utils/NotFoundError');

// Hymn Controller Functions
const addHymn = async (req, res, next) => {
    try {
      const { title, lyrics } = req.body;
      const newHymn = await appService.addHymn({ title, lyrics });
      res.status(201).json(newHymn);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };

const getHymnById = async (req, res) => {
  try {
    const hymn = await appService.getHymnById(req.params.id);
    if (!hymn) {
      throw new NotFoundError('Hymn not found');
    }
    res.json(hymn);
  } catch (error) {
    res.status(error instanceof NotFoundError ? 404 : 500).json({ message: error.message });
  }
};

const updateHymn = async (req, res, next) => {
    try {
        const { title, lyrics } = req.body;
        const updatedHymn = await appService.updateHymn(req.params.id, { title, lyrics });
        res.json(updatedHymn);
      } catch (error) {
        next(error); // Pass to the centralized error handler
      }
};

const getAllHymns = async (req, res, next) => {
    try {
      const hymns = await appService.getAllHymns();
      res.status(200).json(hymns);
    } catch (error) {
      next(error); // Pass error to the centralized error handler
    }
  };

// Favorite Controller Functions
const addFavorite = async (req, res, next) => {
  try {
    const { userId, hymnId } = req.body;
    const response = await appService.addFavoriteForUser(userId, hymnId);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavorite = async (req, res, next) => {
    try {
      const { userId, hymnId } = req.body;
      const response = await appService.removeFavoriteForUser(userId, hymnId);
      res.status(200).json(response);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };
  
// Get all favorites for a user
const getUserFavorites = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const favorites = await appService.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };

module.exports = {
  addHymn,
  getHymnById,
  updateHymn,
  getAllHymns,
  addFavorite,
  removeFavorite,
  getUserFavorites
};
