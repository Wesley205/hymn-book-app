const { Favorite } = require('../models/appModel.js'); // Sequelize model for Hymn and Favorite



class FavoriteRepository {
    // Fetch all favorites for a user
  async getFavoritesByUserId(userId) {
    try {
      return await Favorite.findAll({ where: { userId } });  // Get all favorites for the given user ID
    } catch (error) {
      throw new Error('Error fetching favorites: ' + error.message);
    }
  }

  // Add a new favorite
  async addFavorite(userId, hymnId) {
    try {
      return await Favorite.create({ userId, hymnId }); // Insert a new favorite into the database
    } catch (error) {
      throw new Error('Error adding favorite: ' + error.message);
    }
  }

  // Remove a favorite
  async removeFavorite(userId, hymnId) {
    try {
      const favorite = await Favorite.findOne({ where: { userId, hymnId } });
      if (!favorite) {
        throw new Error('Favorite not found');
      }
      return await favorite.destroy();  // Delete the favorite from the database
    } catch (error) {
      throw new Error('Error removing favorite: ' + error.message);
    }
  }
}

module.exports = new FavoriteRepository();