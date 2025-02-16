const Hymn  = require("../entities/hymnEntities"); 
const { NotFoundError, ValidationError } = require("../../../utilis/error/AppError");

class HymnService {
  // Retrieve all hymns
  async getAllHymns() {
    try {
      const hymns = await Hymn.findAllHymns();
      if (!hymns || hymns.length === 0) {
        throw new NotFoundError("No hymns found");
      }
      return hymns.map((hymn) => ({
        id: hymn.id,
        title: hymn.title,
        snippet: hymn.lyrics.substring(0, 50),
      }));
    } catch (error) {
      throw new Error("Error retrieving hymns: " + error.message);
    }
  }

  // Retrieve hymn by ID
  async getHymnById(id) {
    try {
      const hymn = await Hymn.findHymnById(id);
      if (!hymn) {
        throw new NotFoundError("Hymn not found");
      }
      return hymn;
    } catch (error) {
      throw new Error("Error retrieving hymn: " + error.message);
    }
  }

  // Add a new hymn
  async addHymn(data) {
    try {
      const { title, lyrics } = data;
      if (!title || !lyrics) {
        throw new ValidationError("Title and lyrics are required");
      }
      return await Hymn.createHymn({ title, lyrics });
    } catch (error) {
      throw new Error("Error adding hymn: " + error.message);
    }
  }

  // Update hymn details
  async updateHymn(id, data) {
    try {
      return await Hymn.updateHymn(id, data);
    } catch (error) {
      throw new Error("Error updating hymn: " + error.message);
    }
  }

  // delete hymn by ID
  async deleteHymn(id) {
    try {
      const removed = await Hymn.deleteHymnById(id);
      return removed;
    } catch (error) {
      if (error.message === "Hymn not found") {
        throw new Error (error.message);
      }
      throw new Error("Error deleting hymn: " + error.message);
    }
  };

};


module.exports = new HymnService();