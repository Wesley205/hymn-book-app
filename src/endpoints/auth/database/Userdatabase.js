import User from "../entities/User.js";

class UserDatabase {
  async save(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error("Error saving user: " + error.message);
    }
  }

  async existsByToken(token) {
    try {
      const user = await User.findOne({ where: { key: token } });
      return !!user;
    } catch (error) {
      throw new Error("Error finding user by token: " + error.message);
    }
  }

  async findByKey(token) {
    try {
      const user = await User.findOne({ where: { key: token } });
      return user || null;
    } catch (error) {
      throw new Error("Error finding user by key: " + error.message);
    }
  }

  async findById(id) {
    try {
      const user = await User.findByPk(id);
      return user || null;
    } catch (error) {
      throw new Error("Error finding user by ID: " + error.message);
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }

  async findAll() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error finding all users: " + error.message);
    }
  }

  async update(id, newUserData) {
    try {
      const user = await this.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      // Update only provided fields
      await user.update(newUserData);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async updateKeyOrEmailVerification({ email, newUserKey, isEmailVerified }) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      // Only update the fields that are provided
      if (newUserKey !== undefined) user.key = newUserKey;
      if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error updating key or email verification: " + error.message);
    }
  }

  async delete(token) {
    try {
      const user = await this.findByKey(token);
      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default UserDatabase;
