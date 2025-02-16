const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import database configuration

// Hymn Model
const HymnModel = sequelize.define(
  "Hymn",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lyrics: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "hymns",
  }
);

// Favorite Model
const FavoriteModel = sequelize.define(
  "Favorite",
  { 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hymnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "favorites",
  }
);

// Define Associations
HymnModel.hasMany(FavoriteModel, { foreignKey: "hymnId" });
FavoriteModel.belongsTo(HymnModel, { foreignKey: "hymnId" });

module.exports = { HymnModel, FavoriteModel };
