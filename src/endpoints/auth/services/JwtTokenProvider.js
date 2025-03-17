import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import dotenv from 'dotenv';
dotenv.config();

class JwtTokenProvider {
  constructor() {
    this.jwtSecret = process.env.ACCESS_TOKEN_SECRET;
    this.jwtExpirationInMs = process.env.JWT_EXPIRATION;
  }

  generateToken(user) {
    const now = new Date();
    const expiryDate = `${this.jwtExpirationInMs}m`;
    try {
      return sign({ user }, this.jwtSecret, { expiresIn: expiryDate });
    } catch (error) {
      console.error('Error generating token:', error);
      return null;
    }
  }

  getEmailFromToken(token) {
    try {
      const decoded = verify(token, this.jwtSecret);
      return decoded.user?.email;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserFromToken(token) {
    try {
      const decoded = verify(token, this.jwtSecret);
      return decoded.user;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  validateToken(token) {
    try {
      verify(token, this.jwtSecret);
      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}

export default JwtTokenProvider;