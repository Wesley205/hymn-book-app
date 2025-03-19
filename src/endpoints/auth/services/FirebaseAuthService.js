import FirebaseService from "../../../config/utils/FirebaseService.js";
import pkg from "bcryptjs";
import admin from "firebase-admin";
import UserDatabase from "../database/Userdatabase.js";

const { compareSync, genSaltSync, hashSync } = pkg;

class FirebaseAuthService {
  constructor() {
    this.auth = new FirebaseService().auth;
    this.userDatabase = new UserDatabase();
    this.auth = admin.auth();
  }

  //Create a new user in Firebase 

  async createUserWithEmailAndPassword(email, password, isAdmin = false) {
    try {
      const userRecord = await this.auth.createUser({
        email,
        password, // Firebase handles hashing internally
        emailVerified: false,
      });

      // Store user details in MySQL (excluding password)
      await this.userDatabase.createUser({
        id: userRecord.uid,
        email,
        isAdmin,
        isEmailVerified: false,
      });

      return userRecord;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  //Verify if email is verified in Firebase

  async isEmailVerified(email) {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      return userRecord.emailVerified;
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  }

  //Sync Firebase email verification status with MySQL

  async syncEmailVerification(email) {
    try {
      const isVerified = await this.isEmailVerified(email);
      if (isVerified) {
        await this.userDatabase.updateUser({ email, isEmailVerified: true });
      }
    } catch (error) {
      console.error("Error syncing email verification:", error);
      throw error;
    }
  }

  // Send verification email

  async sendVerificationEmail(email) {
    try {
      return await this.auth.generateEmailVerificationLink(email);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  //update password

  async updatePassword(email, newPassword) {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      if (!userRecord) {
        console.error(`User with email ${email} not found in Firebase.`);
        return false;
      }

      await this.auth.updateUser(userRecord.uid, { password: newPassword });

      console.log(`Password updated successfully for ${email}`);
      return true;
    } catch (error) {
      console.error(`Error updating password for ${email}:`, error.message);
      return false;
    }
  }
}

export default FirebaseAuthService;
