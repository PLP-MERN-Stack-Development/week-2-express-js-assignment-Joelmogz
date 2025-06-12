exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};
// This middleware handles errors in the application
// It logs the error stack and sends a JSON response with the error message