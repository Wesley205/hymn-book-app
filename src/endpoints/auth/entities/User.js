import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database.js"; // MySQL connection instance

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a unique UUID
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true, // Stores JWT token after login
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets to current date
    },
    lastModified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Updates automatically
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true, // Sequelize will automatically handle createdAt & updatedAt
    updatedAt: "lastModified", // Maps Sequelize's `updatedAt` to `lastModified`
  }
);

export default User;
