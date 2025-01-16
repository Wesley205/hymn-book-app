const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Import database configuration

// Hymn Model
const Hymn = sequelize.define('Hymn', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'hymns',
});

// Favorite Model
const Favorite = sequelize.define('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hymnId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'favorites',
});

// Define Associations
Hymn.hasMany(Favorite, { foreignKey: 'hymnId' });
Favorite.belongsTo(Hymn, { foreignKey: 'hymnId' });

module.exports = { Hymn, Favorite };
