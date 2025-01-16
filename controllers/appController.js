const appService = require('../services/appService');
const { NotFoundError, ValidationError } = require ('../utilis/error/AppError');
const errorHandler = require ('../utilis/error/errorHandler');


// const TEST_USER_ID = 1;

// Hymn Controller Functions
const addHymn = async (req, res, next) => {
    try {
      const { title, lyrics } = req.body;
      if (!title || !lyrics) {
        throw new ValidationError('Title and lyrics are required');
      }
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
    next(error);
  }
};

const updateHymn = async (req, res, next) => {
    try {
        const { title, lyrics } = req.body;
        const updatedHymn = await appService.updateHymn(req.params.id, { title, lyrics });
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
      const hymns = await appService.getAllHymns();
      // if (!hymns || hymns.length === 0) {
      //  
      //   // throw new NotFoundError('No hymns found');
      // }
      res.status(200).json(hymns);
    } catch (error) {
      next(error); // Pass error to the centralized error handler
    }
  };

// Favorite Controller Functions
const addFavorite = async (req, res, next) => {
    try {
      const { hymnId } = req.body;
      if (!hymnId) {
        throw new ValidationError('Hymn ID are required');
      }
      const response = await appService.addFavoriteForUser({hymnId: hymnId, userId: TEST_USER_ID});
      res.status(201).json(response);
    } catch (error) {
      next(error); // Pass error to the centralized error handler
    }
  };

const removeFavorite = async (req, res, next) => {
    try {
      console.log(req.params);
      // const { userId, hymnId } = req.prams;
      const userId = req.params.userId;
      const hymnId = req.params.hymnId;
      const response = await appService.removeFavoriteForUser({userId: userId, hymnId: hymnId});
      if (!response) {
        throw new NotFoundError('Favorite not found to remove');
      }
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
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError('No favorites found for this user');
      }
      res.json(favorites);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };

  // Get all favorites for a user
const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await appService.getAllFavorites();
    // if (!favorites || favorites.length === 0) {
      // throw new NotFoundError('No favorites found for this user');
    // }
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
  getUserFavorites,
  getAllFavorites
};
