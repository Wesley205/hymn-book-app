const { HymnModel } = require('../models/appModel');

// Hymn Entity Class
class Hymn {
  constructor(title, lyrics) {
    this.title = title;
    this.lyrics = lyrics;
  }

  // Method to create a hymn
  static async createHymn({ title, lyrics }) {
    const hymn = await HymnModel.create({ title, lyrics });
    return hymn;
  }

  // Method to find a hymn by ID
  static async findHymnById(id) {
    const hymn = await HymnModel.findByPk(id);
    return hymn;
  }

  // Method to update hymn details
  static async updateHymn(id, { title, lyrics }) {
    const hymn = await HymnModel.findByPk(id);
    if (!hymn) {
      throw new Error("Hymn not found");
    }
    hymn.title = title || hymn.title;
    hymn.lyrics = lyrics || hymn.lyrics;
    await hymn.save();
    return hymn;
  }
}

// Favorite Entity Class
class Favorite {
  constructor(userId, hymnId) {
    this.userId = userId;
    this.hymnId = hymnId;
  }

  // Method to add a hymn to favorites
  static async addFavorite({ userId, hymnId }) {
    const favorite = await FavoriteModel.create({ userId, hymnId });
    return favorite;
  }

  // Method to remove a hymn from favorites
  static async removeFavorite({ userId, hymnId }) {
    const favorite = await FavoriteModel.findOne({ where: { userId, hymnId } });
    if (!favorite) {
      throw new Error("Favorite not found");
    }
    await favorite.destroy();
    return favorite;
  }

  // Method to fetch all favorites for a user
  static async getFavoritesByUserId(userId) {
    const favorites = await FavoriteModel.findAll({ where: { userId } });
    return favorites;
  }
}


module.exports = { Hymn, Favorite };
