const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const salesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
);

module.exports = {
  productSchema,
  salesSchema,
};