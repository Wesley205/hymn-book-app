const { NotFoundError, ValidationError, UnauthorizedError } = require('./AppError.js');


const errorHandler = (err, req, res, next) => {
    // Check if the error is an instance of the custom error classes
    if (err instanceof NotFoundError || err instanceof ValidationError || err instanceof UnauthorizedError) {
      return res.status(err.statusCode).json({
        message: err.message || 'An error occurred',
      });
    }
  
    // If the error is not one of the above, it's a server error (500)
    res.status(500).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  };
  
  module.exports = errorHandler;