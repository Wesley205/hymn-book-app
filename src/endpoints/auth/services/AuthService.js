import LoginService from "./LoginService.js";
import RegistrationService from "./RegistrationService.js";
import EmailVerificationService from "./EmailVerificationService.js";
import PasswordResetService from "./PasswordResetService.js";

class AuthService {
  static async login(req, res) {
    try {
      const { email, password, isAdminLogin } = req.body;
      const loginService = new LoginService();

      const { status, data } = await loginService.loginUser(
        email,
        password,
        isAdminLogin
      );
      return res.status(status).json(data);
    } catch (error) {
      console.error("Login error:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async register(req, res) {
    try {
      const registrationService = new RegistrationService();
      const { status, data } = await registrationService.registerUser(req.body);

      // Optional: Send email verification after registration
      if (data.success) {
        const verificationService = new EmailVerificationService();
        await verificationService.sendVerificationEmail(req.body.email);
      }

      return res.status(status).json(data);
    } catch (error) {
      console.error("Registration error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async verifyEmail(req, res) {
    try {
      const email = req.params.email;
      const verificationService = new EmailVerificationService();

      const { status, data } = await verificationService.verifyEmail(email);
      return res.status(status).json(data);
    } catch (error) {
      console.error("Email verification error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "Email and new password are required" });
      }

      const passwordService = new PasswordResetService();
      const { status, data } = await passwordService.updatePassword(email, newPassword);

      return res.status(status).json(data);
    } catch (error) {
      console.error("Password update error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

export default AuthService;