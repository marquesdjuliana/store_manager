const mapStatusHTTP = require('../utils/mapStatusHTTP');
const verifyRequiredFields = require('../utils/verifyRequiredFields');

const validateProduct = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['name'];

  const error = verifyRequiredFields(body, requiredFields);
  if (error) {
    return res.status(mapStatusHTTP('INVALID_REQUEST')).json({ message: error });
  }

  return next();
};

module.exports = validateProduct;