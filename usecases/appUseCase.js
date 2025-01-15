const { Hymn } = require('../models/appModels');
const { Favorite } = require('../models/appModels');
const NotFoundError = require('../utils/NotFoundError');

// Hymn Use Cases
const addHymn = async ({ title, lyrics }) => {
  const hymn = await Hymn.create({ title, lyrics });
  return hymn;
};

const getHymnById = async (id) => {
  const hymn = await Hymn.findByPk(id);
  if (!hymn) {
    throw new NotFoundError('Hymn not found');
  }
  return hymn;
};

const updateHymn = async (id, { title, lyrics }) => {
  const hymn = await Hymn.findByPk(id);
  if (!hymn) {
    throw new NotFoundError('Hymn not found');
  }
  hymn.title = title || hymn.title;
  hymn.lyrics = lyrics || hymn.lyrics;
  await hymn.save();
  return hymn;
};

const getAllHymns = async () => {
  const hymns = await Hymn.findAll();
  return hymns;
};

// Favorite Use Cases
const addFavorite = async ({ userId, hymnId }) => {
  const favorite = await Favorite.create({ userId, hymnId });
  return favorite;
};

const removeFavorite = async ({ userId, hymnId }) => {
  const favorite = await Favorite.findOne({ where: { userId, hymnId } });
  if (!favorite) {
    throw new NotFoundError('Favorite not found');
  }
  await favorite.destroy();
  return favorite;
};

const getUserFavorites = async (userId) => {
  const favorites = await Favorite.findAll({ where: { userId } });
  if (favorites.length === 0) {
    throw new NotFoundError('No favorites found');
  }
  return favorites;
};

module.exports = {
  addHymn,
  getHymnById,
  updateHymn,
  getAllHymns,
  addFavorite,
  removeFavorite,
  getUserFavorites,
};
