const hymnService = require('../services/hymnService');
const { NotFoundError, ValidationError } = require ('../../../utilis/error/AppError');


// Hymn Controller Functions
const addHymn = async (req, res, next) => {
    try {
      const { title, lyrics } = req.body;
      if (!title || !lyrics) {
        throw new ValidationError('Title and lyrics are required');
      }
      const newHymn = await hymnService.addHymn({ title, lyrics });
      res.status(201).json(newHymn);
    } catch (error) {
      next(error); // Pass to the centralized error handler
    }
  };

const getHymnById = async (req, res) => {
  try {
    const hymn = await hymnService.getHymnById(req.params.id);
    if (!hymn) {
      throw new NotFoundError('Hymn not found');
    }
    res.json(hymn);
  } catch (error) {
    next(error);
  }
};

const updateHymn = async (req, res, next) => {
    try {
        const { title, lyrics } = req.body;
        const updatedHymn = await hymnService.updateHymn(req.params.id, { title, lyrics });
        if (!updatedHymn) {
            throw new NotFoundError('Hymn not found to update');
          }
        res.json(updatedHymn);
      } catch (error) {
        next(error); // Pass to the centralized error handler
      }
};

const getAllHymns = async (req, res, next) => {
    try {
      const hymns = await hymnService.getAllHymns();
      if (!hymns || hymns.length === 0) {
        throw new NotFoundError('No hymns found');
      }
      res.status(200).json(hymns);
    } catch (error) {
      next(error); 
    }
  };

const deleteHymn = async (req, res, next) => {
  try {
    const { id } = req.prams;
    await hymnService.deleteHymn(id);
    res.status(200).json({message: "Hymn deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addHymn,
  getHymnById,
  updateHymn,
  getAllHymns,
  deleteHymn,
};
