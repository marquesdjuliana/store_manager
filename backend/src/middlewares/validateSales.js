const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateProductId = (req, res, next) => {
  const products = req.body;
  const productIdExists = products
  .every((product) => 'productId' in product && product.productId !== undefined);

  if (!productIdExists) {
    return res.status(mapStatusHTTP('INVALID_REQUEST'))
    .json({ message: '"productId" is required' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const products = req.body;
  const quantityExists = products.every((product) => 'quantity' in product);
  const quantityCorrect = products
  .every((product) => 'quantity' in product && product.quantity > 0);

  if (!quantityExists) {
    return res.status(mapStatusHTTP('INVALID_REQUEST')).json({ message: '"quantity" is required' });
  }

  if (!quantityCorrect) {
    return res.status(mapStatusHTTP('INVALID_VALUE'))
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateSale = [validateProductId, validateQuantity];

module.exports = {
   validateSale,
   validateProductId,
   validateQuantity,
};
