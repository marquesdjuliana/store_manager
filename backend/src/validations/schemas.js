const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const salesSchema = Joi.object({
  productId: Joi.number().integer(),
  quantity: Joi.number().integer(),
});

module.exports = {
  productSchema,
  salesSchema,
};