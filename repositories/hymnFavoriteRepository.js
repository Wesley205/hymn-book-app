const { Hymn, Favorite } = require('../models/appModel.js'); // Sequelize model for Hymn and Favorite

class HymnFavoriteRepository {

  // Fetch all hymns
  async getAllHymns() {
    try {
      return await Hymn.findAll();  // Fetch all records from the Hymn table
    } catch (error) {
      throw new Error('Error fetching hymns: ' + error.message);
    }
  }

  // Fetch a single hymn by ID
  async getHymnById(id) {
    try {
      const hymn = await Hymn.findOne({ where: { id } }); // Fetch hymn by primary key
      if (!hymn) {
        throw new Error('Hymn not found');
      }
      return hymn;
    } catch (error) {
      throw new Error('Error fetching hymn by ID: ' + error.message);
    }
  }

  // Create a new hymn
  async createHymn(data) {
    try {
      return await Hymn.create(data); // Insert a new hymn into the database
    } catch (error) {
      throw new Error('Error creating hymn: ' + error.message);
    }
  }

  // Update a hymn by ID
  async updateHymn(id, data) {
    try {
      const hymn = await Hymn.findOne({ where: { id } });
      if (!hymn) {
        throw new Error('Hymn not found');
      }
      return await hymn.update(data);  // Update the hymn in the database
    } catch (error) {
      throw new Error('Error updating hymn: ' + error.message);
    }
  }

  // Delete a hymn by ID
  async deleteHymn(id) {
    try {
      const hymn = await Hymn.findOne({ where: { id } });
      if (!hymn) {
        throw new Error('Hymn not found');
      }
      return await hymn.destroy();  // Delete the hymn from the database
    } catch (error) {
      throw new Error('Error deleting hymn: ' + error.message);
    }
  }

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

module.exports = new HymnFavoriteRepository();
