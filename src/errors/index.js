const pkg = require("jsonwebtoken");

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = async (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  const { JsonWebTokenError } = pkg;

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      message:
        "To access this feature, a valid authentication token must be sent.",
    });
  }

  console.error(error);

  return res.status(500).json({ message: "Internal Server Error." });
};

module.exports = { AppError, errorHandler };
