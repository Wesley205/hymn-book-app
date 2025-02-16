const { FavoriteModel } = require("../../../models/appModel");

class Favorite {
  constructor(userId, hymnId) {
    this.userId = userId;
    this.hymnId = hymnId;
  }

  // Add a hymn to favorites
  static async addFavorite({ userId, hymnId }) {
    return await FavoriteModel.create({ userId, hymnId });
  }

  // Remove a hymn from favorites
  static async removeFavorite({ userId, hymnId }) {
    const favorite = await FavoriteModel.findOne({ where: { userId, hymnId } });
    if (!favorite) throw new Error("Favorite not found");

    await favorite.destroy();
    return favorite;
  }

  // get all favorites
  static async findAllFavorites() {
    return await FavoriteModel.findAll(); // Retrieve all favorites from DB
  }
  
  // Fetch all favorites for a user
  static async getUserFavorites(userId) {
    return await FavoriteModel.findAll({ where: { userId } });
  }

  // Check if a hymn is already favorited
  static async isHymnFavorited(userId, hymnId) {
    const favorite = await FavoriteModel.findOne({ where: { userId, hymnId } });
    return favorite !== null;
  }
}

module.exports = Favorite;
