module.exports = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
// This middleware logs the request method and URL with a timestamp
// It can be used in an Express application to log incoming requests