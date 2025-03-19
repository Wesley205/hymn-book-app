import UserDatabase from "../repositories/UserDatabase.js"; 
import FirebaseAuthService from "./FirebaseAuthService.js";


class PasswordResetService {
  constructor() {
    this.userDatabase = new UserDatabase(); // MySQL user database
    this.firebaseAuthService = new FirebaseAuthService(); // Firebase authentication service
  }

  /**
   * Resets the user's password securely.
   * @param {string} email - User's email.
   * @param {string} newPassword - The new password.
   * @returns {Object} - Response containing success or error message.
   */
  async updatePassword(email, newPassword) {
    try {
      //Find the user by email in MySQL
      const user = await this.userDatabase.findByEmail(email);
      if (!user) {
        return { status: 404, data: { success: false, message: "User not found" } };
      }

      //Ensure the user has verified their email before resetting the password
      if (!user.isEmailVerified) {
        return { status: 403, data: { success: false, message: "Email not verified. Please verify before resetting password." } };
      }

      //Update password in Firebase Authentication
      const firebaseUpdateSuccess = await this.firebaseAuthService.updatePassword(email, newPassword);
      if (!firebaseUpdateSuccess) {
        return { status: 500, data: { success: false, message: "Failed to update password in Firebase" } };
      }

      return { status: 200, data: { success: true, message: "Password updated successfully" } };
    } catch (error) {
      console.error("Error updating password:", error.message);
      return { status: 500, data: { success: false, message: "Internal server error" } };
    }
  }
}

export default PasswordResetService;
