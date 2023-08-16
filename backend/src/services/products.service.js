const { productsModel } = require('../models');
const validate = require('../validations/validationsInputValues');

const listAllProducts = async () => {
    const products = await productsModel.findAll();
    return { status: 'SUCCESSFUL', data: products };
};

const getProductsId = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (productName) => {
  const error = validate.validateProduct(productName);
  if (error) return { status: error.status, data: { message: error.message } };
  const insertId = await productsModel.createProduct(productName);
  const insertedProduct = await productsModel.findById(insertId);
  if (insertedProduct) return { status: 'CREATED', data: insertedProduct };
};

module.exports = {
  listAllProducts,
  getProductsId,
  createProduct,
};