class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = { NotFoundError, ValidationError };
// This module defines custom error classes for handling specific types of errors
// in the application. The `NotFoundError` is used for 404 errors, and the `ValidationError`    