const { productSchema, salesSchema } = require('./schemas');

const validateProduct = (keysObjectToValidate) => {
  const { error } = productSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateSale = (keysObjectToValidate) => {
  const { error } = salesSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateProduct,
  validateSale,
};