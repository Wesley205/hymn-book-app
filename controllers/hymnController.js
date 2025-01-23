const hymnService = require('../services/hymnService');
const { NotFoundError, ValidationError } = require ('../utilis/error/AppError');


// Hymn Controller Functions
const addHymn = async (req, res, next) => {
    try {
      const { title, lyrics } = req.body;
      if (!title || !lyrics) {
        throw new ValidationError('Title and lyrics are required');
      }
      const newHymn = await hymnService.addHymn({ title, lyrics });
      res.status(201).json(newHymn);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };

const getHymnById = async (req, res) => {
  try {
    const hymn = await hymnService.getHymnById(req.params.id);
    if (!hymn) {
      throw new NotFoundError('Hymn not found');
    }
    res.json(hymn);
  } catch (error) {
    next(error);
  }
};

const updateHymn = async (req, res, next) => {
    try {
        const { title, lyrics } = req.body;
        const updatedHymn = await hymnService.updateHymn(req.params.id, { title, lyrics });
        if (!updatedHymn) {
            throw new NotFoundError('Hymn not found to update');
          }
        res.json(updatedHymn);
      } catch (error) {
        next(error); // Pass to the centralized error handler
      }
};

const getAllHymns = async (req, res, next) => {
    try {
      const hymns = await hymnService.getAllHymns();
      if (!hymns || hymns.length === 0) {
        throw new NotFoundError('No hymns found');
      }
      res.status(200).json(hymns);
    } catch (error) {
      next(error); 
    }
  };

// Favorite Controller Functions
const addFavorite = async (req, res, next) => {
    try {
      
      const { userId, hymnId } = req.body;
      if (!hymnId) {
        throw new ValidationError('Hymn ID are required');
      }
      const response = await hymnService.addFavoriteForUser({hymnId: hymnId, userId: userId});
      res.status(201).json(response);
    } catch (error) {
      next(error); 
    }
  };

const removeFavorite = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const hymnId = req.params.hymnId;
      const response = await hymnService.removeFavoriteForUser({userId: userId, hymnId: hymnId});
      if (!response) {
        throw new NotFoundError('Favorite not found to remove');
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

// Get all favorites for a user
const getUserFavorites = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const favorites = await hymnService.getUserFavorites(userId);
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError('No favorites found for this user');
      }
      res.json(favorites);
    } catch (error) {
      next(error); 
    }
  };

// Get all favorites for a user
const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await hymnService.getAllFavorites();
    if (!favorites || favorites.length === 0) {
      throw new NotFoundError('No favorites found');
    }
    res.status(200).json(favorites);
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  addHymn,
  getHymnById,
  updateHymn,
  getAllHymns,
  addFavorite,
  removeFavorite,
  getUserFavorites,
  getAllFavorites
};
