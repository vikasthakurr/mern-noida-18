// custom error class that extends the native Error
// allows throwing errors with an HTTP status code attached
// usage: throw new ApiError(404, "User not found")
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // sets this.message
    this.statusCode = statusCode;
    this.success = false;

    // captures the stack trace excluding the constructor call itself
    // makes stack traces cleaner and easier to debug
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
