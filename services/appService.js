const { Hymn, Favorite } = require('../models/appModel');
const NotFoundError = require('../utils/NotFoundError');

class AppService {
  // Retrieve all hymns
  async getAllHymns() {
    try {
      const hymns = await Hymn.findAll();
      if (!hymns || hymns.length === 0) {
        throw new NotFoundError('No hymns found');
      }
      return hymns.map((hymn) => ({
        id: hymn.id,
        title: hymn.title,
        snippet: hymn.lyrics.substring(0, 50), // Return a snippet of lyrics as an example transformation
      }));
    } catch (error) {
      throw new Error('Error retrieving hymns: ' + error.message);
    }
  }

  // Retrieve hymn by ID
  async getHymnById(id) {
    try {
      const hymn = await Hymn.findByPk(id);
      if (!hymn) {
        throw new NotFoundError('Hymn not found');
      }
      return hymn;
    } catch (error) {
      throw new Error('Error retrieving hymn: ' + error.message);
    }
  }

  // Add a new hymn
  async addHymn(data) {
    try {
      const hymn = await Hymn.create(data);
      return hymn;
    } catch (error) {
      throw new Error('Error adding hymn: ' + error.message);
    }
  }

  // Update hymn details
  async updateHymn(id, data) {
    try {
      const hymn = await Hymn.findByPk(id);
      if (!hymn) {
        throw new NotFoundError('Hymn not found');
      }
      return await hymn.update(data);
    } catch (error) {
      throw new Error('Error updating hymn: ' + error.message);
    }
  }

  // Add a favorite for a user
  async addFavoriteForUser(userId, hymnId) {
    try {
      const hymn = await this.getHymnById(hymnId); // Reuse existing method
      if (!hymn) {
        throw new NotFoundError('Hymn not found for favoriting');
      }
      const favorite = await Favorite.create({ userId, hymnId });
      return {
        message: 'Favorite added successfully',
        favorite: {
          hymnId: favorite.hymnId,
          userId: favorite.userId,
        },
      };
    } catch (error) {
      throw new Error('Error adding favorite: ' + error.message);
    }
  }

  // Remove a favorite for a user
  async removeFavoriteForUser(userId, hymnId) {
    try {
      const favorite = await Favorite.findOne({ where: { userId, hymnId } });
      if (!favorite) {
        throw new NotFoundError('Favorite not found');
      }
      await favorite.destroy();
      return { message: 'Favorite removed successfully' };
    } catch (error) {
      throw new Error('Error removing favorite: ' + error.message);
    }
  }

  // Retrieve favorites for a user
  async getUserFavorites(userId) {
    try {
      const favorites = await Favorite.findAll({ where: { userId } });
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError('No favorites found');
      }
      const hymnDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const hymn = await this.getHymnById(favorite.hymnId);
          return {
            id: hymn.id,
            title: hymn.title,
            lyrics: hymn.lyrics,
          };
        })
      );
      return hymnDetails;
    } catch (error) {
      throw new Error('Error retrieving user favorites: ' + error.message);
    }
  }
}

module.exports = new AppService();
