import User from "../entities/User.js";

class UserDatabase {
  //Save a new user to the database
  async save(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error("Error saving user: " + error.message);
    }
  }

  //Check if a user exists by their token
  async existsByToken(token) {
    try {
      const user = await User.findOne({ where: { token } });
      return !!user;
    } catch (error) {
      throw new Error("Error finding user by token: " + error.message);
    }
  }

 //Find user by token
  async findByToken(token) {
    try {
      return await User.findOne({ where: { token } }) || null;
    } catch (error) {
      throw new Error("Error finding user by token: " + error.message);
    }
  }

 //Find user by ID
  async findById(id) {
    try {
      return await User.findByPk(id) || null;
    } catch (error) {
      throw new Error("Error finding user by ID: " + error.message);
    }
  }

  //Find user by email
  async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } }) || null;
    } catch (error) {
      throw new Error("Error finding user by email: " + error.message);
    }
  }

  //Get all users
  async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Error finding all users: " + error.message);
    }
  }

  //Update user details
  async update(id, newUserData) {
    try {
      const user = await this.findById(id);
      if (!user) throw new Error("User not found");

      await user.update(newUserData);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  //Update a user's token or email verification status
  async updateTokenOrEmailVerification({ email, newToken, isEmailVerified }) {
    try {
      const user = await this.findByEmail(email);
      if (!user) throw new Error("User not found");

      if (newToken !== undefined) user.token = newToken;
      if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;

      await user.save();
      return user;
    } catch (error) {
      throw new Error("Error updating token or email verification: " + error.message);
    }
  }

  // Delete a user by token
  
  async deleteByToken(token) {
    try {
      const user = await this.findByToken(token);
      if (!user) throw new Error("User not found");

      await user.destroy();
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default UserDatabase;
