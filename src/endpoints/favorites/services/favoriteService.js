const Favorite  = require("../entities/favoriteEntities");
const  Hymn  = require("../../hymns/entities/hymnEntities");
const { NotFoundError, ValidationError } = require("../../../utilis/error/AppError");

class favoriteService {

   // Retrieve all favorites
   async getAllFavorites() {
    try {
      const favorites = await Favorite.findAllFavorites();
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError("No favorites found");
      }
      const hymnDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const hymn = await Hymn.findHymnById(favorite.hymnId);
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

  // Add a favorite for a user
  async addFavoriteForUser({ userId, hymnId }) {
    try {
      console.log("Checking hymn with ID:", hymnId);
      if (!hymnId || !userId) {
        throw new ValidationError("Hymn ID and User ID are required");
      }
      const hymn = await Hymn.findHymnById(hymnId);
      if (!hymn) {
         throw new NotFoundError("Hymn not found for favoriting");
      }

      const alreadyFavorited = await Favorite.isHymnFavorited(userId, hymnId);
      if (alreadyFavorited) {
        throw new ValidationError("Hymn is already in favorites");
      }

      const favorite = await Favorite.addFavorite({userId, hymnId});

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
      console.log(`Removing favorite for user: ${userId}, hymn: ${hymnId}`);

      const removed = await Favorite.removeFavorite(userId, hymnId);
      if (!removed) {
        throw new NotFoundError("Favorite not found");
      }
      return { message: "Favorite removed successfully" };
    } catch (error) {
      throw new Error("Error removing favorite: " + error.message);
    }
  }

  // Retrieve favorites for a user
  async getUserFavorites(userId) {
    try {
      const favorites = await Favorite.getUserFavorites({
        where: { userId: userId },
      });
      if (!favorites || favorites.length === 0) {
        throw new NotFoundError("No favorites found");
      }

      const hymnDetails = await Promise.all(
        favorites.map(async (favorite) => {
          const hymn = await Hymn.findHymnById(favorite.hymnId);
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
}
module.exports = new favoriteService();
