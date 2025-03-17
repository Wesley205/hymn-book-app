import FirebaseAuthService from './FirebaseAuthService.js';

class EmailVerificationService {
  constructor() {
    this.firebaseAuthService = new FirebaseAuthService();
    this.userDatabase = this.firebaseAuthService.userDatabase;
  }

  // Verify email status in Firebase & sync with MySQL
  async verifyEmail(email) {
    const response = {};

    try {
      // Check if the user exists in MySQL
      const user = await this.userDatabase.findByEmail(email);
      if (!user) {
        return { status: 404, data: { success: false, message: "User not found" } };
      }

      //Fetch user email verification status from Firebase
      const userRecord = await this.firebaseAuthService.auth.getUserByEmail(email);

      if (userRecord.emailVerified) {
        //Update MySQL only if not already verified
        if (!user.isEmailVerified) {
          await this.userDatabase.updateKeyOrEmailVerification({ email, isEmailVerified: true });
        }

        response.success = true;
        response.message = "Email is verified";
        return { status: 200, data: response };
      } else {
        //Send email verification link
        const link = await this.firebaseAuthService.sendVerificationEmail(email);

        response.success = false;
        response.message = "Email is not verified";
        response.actions = `Check ${email} for verification`;
        response.link = link;
        
        return { status: 202, data: response };
      }
    } catch (error) {
      console.error("Error verifying email:", error.message);

      //Handle Firebase "user-not-found" error
      if (error.code === "auth/user-not-found") {
        return { status: 404, data: { success: false, message: "User not found in Firebase" } };
      }

      return {
        status: 500,
        data: { success: false, message: `Error verifying email: ${error.message}` },
      };
    }
  }
}

export default EmailVerificationService;
