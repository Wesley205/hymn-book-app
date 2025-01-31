const hymnRepository = require("../repositories/hymnRepository.js");
const NotFoundError = require("../utils/NotFoundError");

class HymnUseCases {
 
  async addHymn({ title, lyrics }) {
    try {
      const hymn = await hymnRepository.addHymn({ title, lyrics });
      return hymn;
    } catch (error) {
      throw new Error("Error in addHymn use case: " + error.message);
    }
  }

  async getHymnById(id) {
    try {
      const hymn = await hymnRepository.getHymnById(id);
      if (!hymn) {
        throw new NotFoundError("Hymn not found");
      }
      return hymn;
    } catch (error) {
      throw new Error("Error in getHymnById use case: " + error.message);
    }
  }

  async updateHymn(id, { title, lyrics }) {
    try {
      const hymn = await hymnRepository.getHymnById(id);
      if (!hymn) {
        throw new NotFoundError("Hymn not found");
      }
      hymn.title = title || hymn.title;
      hymn.lyrics = lyrics || hymn.lyrics;
      await hymn.save();
      return hymn;
    } catch (error) {
      throw new Error("Error in updateHymn use case: " + error.message);
    }
  }

  async getAllHymns(searchQuery = "") {
    try {
      const hymns = await hymnRepository.getHymns(searchQuery);
      if (!hymns || hymns.length === 0) {
        throw new Error("No hymns found");
      }
      return hymns;
    } catch (error) {
      throw new Error("Error in getAllHymns use case: " + error.message);
    }
  }
}

module.exports = new HymnUseCases();
