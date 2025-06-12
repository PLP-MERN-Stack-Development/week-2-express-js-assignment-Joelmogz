exports.authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) return next();
  res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
};
// This middleware checks for a valid API key in the request headers
// If the key matches the expected value, it calls `next()` to proceed