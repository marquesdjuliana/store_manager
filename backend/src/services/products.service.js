const { productsModel } = require('../models');

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

module.exports = {
  listAllProducts,
  getProductsId,
};