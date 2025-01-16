const hymnFavoriteRepository = require('../repositories/hymnFavoriteRepository.js');
const NotFoundError = require('../utils/NotFoundError');

class HymnFavoriteUseCases {
  // Hymn Use Cases

  async addHymn({ title, lyrics }) {
    try {
      const hymn = await hymnFavoriteRepository.addHymn({ title, lyrics });
      return hymn;
    } catch (error) {
      throw new Error('Error in addHymn use case: ' + error.message);
    }
  }

  async getHymnById(id) {
    try {
      const hymn = await hymnFavoriteRepository.getHymnById(id);
      if (!hymn) {
        throw new NotFoundError('Hymn not found');
      }
      return hymn;
    } catch (error) {
      throw new Error('Error in getHymnById use case: ' + error.message);
    }
  }

  async updateHymn(id, { title, lyrics }) {
    try {
      const hymn = await hymnFavoriteRepository.getHymnById(id);
      if (!hymn) {
        throw new NotFoundError('Hymn not found');
      }
      hymn.title = title || hymn.title;
      hymn.lyrics = lyrics || hymn.lyrics;
      await hymn.save();
      return hymn;
    } catch (error) {
      throw new Error('Error in updateHymn use case: ' + error.message);
    }
  }

  async getAllHymns(searchQuery = '') {
    try {
      const hymns = await hymnFavoriteRepository.getHymns(searchQuery);
      if (!hymns || hymns.length === 0) {
        throw new Error('No hymns found');
      }
      return hymns;
    } catch (error) {
      throw new Error('Error in getAllHymns use case: ' + error.message);
    }
  }

  // Favorite Use Cases

  async addFavorite(userId, hymnId) {
    try {
      const favorite = await hymnFavoriteRepository.addFavorite(userId, hymnId);
      return favorite;
    } catch (error) {
      throw new Error('Error in addFavorite use case: ' + error.message);
    }
  }

  async removeFavorite(userId, hymnId) {
    try {
      await hymnFavoriteRepository.removeFavorite(userId, hymnId);
    } catch (error) {
      throw new Error('Error in removeFavorite use case: ' + error.message);
    }
  }

  async getUserFavorites(userId) {
    try {
      const favorites = await hymnFavoriteRepository.getFavoritesByUserId(userId);
      if (favorites.length === 0) {
        throw new NotFoundError('No favorites found');
      }
      return favorites;
    } catch (error) {
      throw new Error('Error in getUserFavorites use case: ' + error.message);
    }
  }
}

module.exports = new HymnFavoriteUseCases();
