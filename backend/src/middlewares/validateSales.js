const mapStatusHTTP = require('../utils/mapStatusHTTP');
const validate = require('../validations/validationsInputValues');

const validateSale = (req, res, next) => {
  const { body } = req;
  const error = validate.validateSale(body);
  if (error) {
    return res.status(mapStatusHTTP('INVALID_REQUEST')).json({ message: error.message });
  }
  return next();
};

module.exports = validateSale;
