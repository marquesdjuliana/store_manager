const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5),
});

const salesSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
  }),
);

module.exports = {
  productSchema,
  salesSchema,
};