exports.validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'Validation Error: Missing or invalid fields' });
  }
  next();
};
// This middleware checks if the required fields are present in the request body
// If any field is missing or invalid, it responds with a 400 status code and an error message