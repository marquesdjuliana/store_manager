const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string(),
});

const salesSchema = Joi.object({
  productId: Joi.number().integer(),
  quantity: Joi.number().integer(),
});

module.exports = {
  productSchema,
  salesSchema,
};