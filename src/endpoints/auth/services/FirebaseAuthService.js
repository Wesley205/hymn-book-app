import FirebaseService from "../../../config/utils/FirebaseService.js";
import pkg from "bcryptjs";
import UserDatabase from "../database/Userdatabase.js";

const { compareSync, genSaltSync, hashSync } = pkg;

class FirebaseAuthService {
  constructor() {
    this.auth = new FirebaseService().auth;
    this.userDatabase = new UserDatabase();
  }

  //Create a new user in Firebase and store details in MySQL

  async createUserWithEmailAndPassword(email, password, isAdmin = false) {
    try {
      const hashedPassword = this.hashPassword(password);
      const userRecord = await this.auth.createUser({
        email,
        password: hashedPassword,
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
      const link = await this.auth.generateEmailVerificationLink(email);
      return link;
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  // Authenticate user with email & password

  async verifyPassword(email, password) {
    const user = await this.userDatabase.findByEmail(email);
    if (!user || !user.password) return false;
    return this.isPasswordCorrect(password, user.password);
  }

  // Check if password matches hashed password

  isPasswordCorrect(password, hashedPassword) {
    try {
      return compareSync(password, hashedPassword);
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }

  // Hash a password before storing it

  hashPassword(password) {
    try {
      const salt = genSaltSync(10);
      return hashSync(password, salt);
    } catch (error) {
      console.error("Error hashing password:", error);
      return null;
    }
  }
}

export default FirebaseAuthService;
