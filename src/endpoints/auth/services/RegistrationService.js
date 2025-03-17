import FirebaseAuthService from "./FirebaseAuthService";
import User from "../entities/User.js";
import JwtTokenProvider from './JwtTokenProvider.js';

class RegistrationService {
  constructor() {
    this.tokenProvider = new JwtTokenProvider()
    this.firebaseAuthService = new FirebaseAuthService();
    this.userDatabase = this.firebaseAuthService.userDatabase;
  }
  async registerUser(userJson) {
    const user = User.fromJson(userJson);
    const response = {};

    try {
      // Create user in Firebase
      const userRecord =
        await this.firebaseAuthService.createUserWithEmailAndPassword(
          user.email,
          user.password
        );

      // Generate verification link using Firebase
      const verificationLink =
        await this.firebaseAuthService.sendVerificationEmail(userRecord.email);

      response.success = true;
      response.message = "User registered successfully. Verify your email.";
      response.verificationLink = verificationLink;

      // Generate JWT token
      const token = this.tokenProvider.generateToken({
        id: userRecord.uid,
        email: user.email,
        isAdmin: false, // Default new user to non-admin
      });

      // Save user details in MySQL (excluding password, Firebase manages it)
      await this.userDatabase.createUser({
        id: userRecord.uid,
        email: user.email,
        isAdmin: false,
        isEmailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      response.token = token;
      return { status: 200, data: response };
    } catch (error) {
      console.error("Error registering user:", error.message);
      response.success = false;
      response.message = `Registration failed: ${error.message}`;
      return { status: 500, data: response };
    }
  }
}

export default RegistrationService;
