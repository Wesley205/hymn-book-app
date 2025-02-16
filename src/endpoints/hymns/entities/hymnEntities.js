const { HymnModel } = require("../../../models/appModel");

class Hymn {
  constructor(title, lyrics) {
    this.title = title;
    this.lyrics = lyrics;
  }

  // Create a hymn
  static async createHymn({ title, lyrics }) {
    return await HymnModel.create({ title, lyrics });
  }

  // Find a hymn by ID
  static async findHymnById(id) {
    return await HymnModel.findByPk(id);
  }

  // Retrieve all hymns
  static async findAllHymns() {
    return await HymnModel.findAll();
  }

  // delete hymn by ID
  static async deleteHymnById(id) {
    const hymn = await HymnModel.findByPk(id);
    if(!hymn) throw new Error ("Hymn not found");

    await hymn.destroy();
    return {message: "Hymn deleted successfully", id };
  }

  // Update hymn details
  static async updateHymn(id, { title, lyrics }) {
    const hymn = await HymnModel.findByPk(id);
    if (!hymn) throw new Error("Hymn not found");

    hymn.title = title || hymn.title;
    hymn.lyrics = lyrics || hymn.lyrics;
    await hymn.save();
    
    return hymn;
  }
}

module.exports = Hymn;
