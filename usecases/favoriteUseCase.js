const favoriteRepository = require('../repositories/favouriteRepositories');
const NotFoundError = require('../utils/NotFoundError');


class FavoriteUseCases{

async addFavorite(userId, hymnId) {
    try {
      const favorite = await favoriteRepository.addFavorite(userId, hymnId);
      return favorite;
    } catch (error) {
      throw new Error('Error in addFavorite use case: ' + error.message);
    }
  }

  async removeFavorite(userId, hymnId) {
    try {
      await favoriteRepository.removeFavorite(userId, hymnId);
    } catch (error) {
      throw new Error('Error in removeFavorite use case: ' + error.message);
    }
  }

  async getUserFavorites(userId) {
    try {
      const favorites = await favoriteRepository.getFavoritesByUserId(userId);
      if (favorites.length === 0) {
        throw new NotFoundError('No favorites found');
      }
      return favorites;
    } catch (error) {
      throw new Error('Error in getUserFavorites use case: ' + error.message);
    }
  }
}

module.exports = new FavoriteUseCases();

