import JwtTokenProvider from './JwtTokenProvider.js';
import FirebaseAuthService from './FirebaseAuthService.js';
import UserDatabase from "../database/Userdatabase.js";

class LoginService {
  constructor() {
    this.tokenProvider = new JwtTokenProvider();
    this.firebaseAuthService = new FirebaseAuthService();
    this.UserDatabase= new UserDatabase();
  }

  async loginUser(email, password, isAdminLogin) {
    const response = {};

    try {
      //Verify password using Firebase
      const isValidPassword = await this.firebaseAuthService.verifyPassword(email, password);
      if (!isValidPassword) {
        response.success = false;
        response.message = "Incorrect email or password";
        return { status: 401, data: response };
      }

      //Check if email is verified
      const isEmailVerified = await this.firebaseAuthService.isEmailVerified(email);
      if (!isEmailVerified) {
        response.success = false;
        response.message = "Email not verified. Please verify your email.";
        return { status: 403, data: response };
      }

      //Fetch user from MySQL 
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        response.success = false;
        response.message = "User not found";
        return { status: 404, data: response };
      }

      //Generate JWT token with essential user info
      const token = this.tokenProvider.generateToken({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      //Update user session in MySQL
      await this.userRepository.updateUserToken(user.id, token);

      //If admin login is required, check user role
      if (isAdminLogin && !user.isAdmin) {
        response.success = false;
        response.message = "Access denied. Only admins can log in.";
        return { status: 403, data: response };
      }

      //Login successful
      response.success = true;
      response.message = "Login successful";
      response.token = token;
      response.user = user;
      return { status: 200, data: response };

    } catch (error) {
      console.error("Error signing in:", error.message);
      response.success = false;
      response.message = `Error signing in: ${error.message}`;
      return { status: 500, data: response };
    }
  }
}

export default LoginService;
