class NotFoundError extends Error {
    constructor(message) {
      super(message);  // Inherit from Error class
      this.name = "NotFoundError";  // Name of the error type
      this.statusCode = 404;  // HTTP status code
    }
  }
  
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
      this.statusCode = 400; // HTTP Bad Request status code
    }
  }

  class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnauthorizedError";
      this.statusCode = 401; // HTTP Unauthorized status code
    }
  }

  module.exports = {NotFoundError,ValidationError,UnauthorizedError};
  