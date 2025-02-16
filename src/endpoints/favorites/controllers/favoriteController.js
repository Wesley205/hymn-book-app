const favoriteService = require("../services/favoriteService.js");
const { NotFoundError, ValidationError } = require ('../../../utilis/error/AppError.js');

//add favorite for a user

const addFavorite = async (req, res, next) => {
  try {
    const { userId, hymnId } = req.body;
    if (!hymnId) {
      throw new ValidationError("Hymn ID are required");
    }
    const response = await favoriteService.addFavoriteForUser({
      hymnId: hymnId,
      userId: userId,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

//remove favourite for user

const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const hymnId = req.params.hymnId;
    const response = await favoriteService.removeFavoriteForUser({
      userId: userId,
      hymnId: hymnId,
    });
    if (!response) {
      throw new NotFoundError("Favorite not found to remove");
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
    const favorites = await favoriteService.getUserFavorites(userId);
    if (!favorites || favorites.length === 0) {
      throw new NotFoundError("No favorites found for this user");
    }
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

// Get all favorites in app

const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getAllFavorites();
    if (!favorites || favorites.length === 0) {
      throw new NotFoundError("No favorites found");
    }
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  getAllFavorites,
};
