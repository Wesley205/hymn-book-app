const { Hymn } = require('../models/hymnModel');
const { Favorite } = require('../models/favoriteModel');
const NotFoundError = require('../utils/NotFoundError');

// Hymn Controller Functions
const addHymn = async (req, res) => {
  try {
    const { title, lyrics } = req.body;
    const newHymn = await Hymn.create({ title, lyrics });
    res.status(201).json(newHymn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHymnById = async (req, res) => {
  try {
    const hymn = await Hymn.findByPk(req.params.id);
    if (!hymn) {
      throw new NotFoundError('Hymn not found');
    }
    res.json(hymn);
  } catch (error) {
    res.status(error instanceof NotFoundError ? 404 : 500).json({ message: error.message });
  }
};

const updateHymn = async (req, res) => {
  try {
    const hymn = await Hymn.findByPk(req.params.id);
    if (!hymn) {
      throw new NotFoundError('Hymn not found');
    }
    const { title, lyrics } = req.body;
    hymn.title = title || hymn.title;
    hymn.lyrics = lyrics || hymn.lyrics;
    await hymn.save();
    res.json(hymn);
  } catch (error) {
    res.status(error instanceof NotFoundError ? 404 : 500).json({ message: error.message });
  }
};

const getAllHymns = async (req, res) => {
  try {
    const hymns = await Hymn.findAll();
    res.json(hymns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Favorite Controller Functions
const addFavorite = async (req, res) => {
  try {
    const { userId, hymnId } = req.body;
    const favorite = await Favorite.create({ userId, hymnId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { userId, hymnId } = req.body;
    const favorite = await Favorite.findOne({ where: { userId, hymnId } });
    if (!favorite) {
      throw new NotFoundError('Favorite not found');
    }
    await favorite.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(error instanceof NotFoundError ? 404 : 500).json({ message: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await Favorite.findAll({ where: { userId } });
    if (!favorites.length) {
      throw new NotFoundError('No favorites found');
    }
    res.json(favorites);
  } catch (error) {
    res.status(error instanceof NotFoundError ? 404 : 500).json({ message: error.message });
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
