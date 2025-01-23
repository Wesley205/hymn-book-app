const { Hymn, Favorite } = require ("../models/appModel");
const { NotFoundError, ValidationError } = require("../utilis/error/AppError");



class favoriteService {
    // Add a favorite for a user
  async addFavoriteForUser({ userId, hymnId }) {
    try {
      console.log("Checking hymn with ID:", hymnId);
      if (!hymnId) {
        throw new ValidationError("Hymn ID are required");
      }
      const hymn = await this.getHymnById(hymnId); // Reuse existing method
      if (!hymn) {
        // throw new NotFoundError("Hymn not found for favoriting");
      }
      const favorite = await Favorite.create({
        hymnId: hymnId,
        userId: userId,
      });
      return {
        message: "Favorite added successfully",
        favorite: {
          hymnId: favorite.hymnId,
          userId: favorite.userId,
        },
      };
    } catch (error) {
      throw new Error("Error adding favorite: " + error.message);
    }
  }

  // Remove a favorite for a user
  async removeFavoriteForUser({ userId, hymnId }) {
    try {
      console.log(
        "Trying to remove favorite for userId:",
        userId,
        "and hymnId:",
        hymnId
      );
      const favorite = await Favorite.findOne({
        where: { userId: userId, hymnId },
      });
      if (!favorite) {
        throw new NotFoundError("Favorite not found");
      }
      await favorite.destroy();
      return { message: "Favorite removed successfully" };
    } catch (error) {
      throw new Error("Error removing favorite: " + error.message);
    }
  }

  // Retrieve favorites for a user
  async getUserFavorites(userId) {
    try {
      const favorites = await Favorite.findAll({ where: { userId: userId } });
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError("No favorites found");
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
      throw new Error("Error retrieving user favorites: " + error.message);
    }
  }

  // Retrieve all favorites
  async getAllFavorites() {
    try {
      const favorites = await Favorite.findAll();
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError("No favorites found");
      }
      const hymnDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const hymn = await this.getHymnById(favorite.hymnId);
          return {
            id: hymn.id,
            userId: hymn.userId,
            title: hymn.title,
            lyrics: hymn.lyrics.substring(0, 50),
          };
        })
      );
      return hymnDetails;
    } catch (error) {
      throw new Error("Error retrieving user favorites: " + error.message);
    }
  }

  async getHymnById(id) {
    try {
      const hymn = await Hymn.findByPk(id);
      if (!hymn) {
        return {};
        // throw new NotFoundError("Hymn not found");
      }
      return hymn;
    } catch (error) {
      throw new Error("Error retrieving hymn: " + error.message);
    }
  }
  
}

module.exports = new favoriteService(); 