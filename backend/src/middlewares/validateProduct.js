const validateProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Product name is required' });
  }
  next();
};

module.exports = validateProduct;