const { salesModel, productsModel } = require('../models');

const listAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.findSaleById(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const createCompleteSale = async (productsSold) => {
  const checkProductPromises = productsSold.map(async (product) => {
    const existingProduct = await productsModel.findById(product.productId);
    console.log(existingProduct);
    return !!existingProduct;
  });

  const allProductsExist = await Promise.all(checkProductPromises);

  if (!allProductsExist.every((exists) => exists)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const newSaleId = await salesModel.createCompleteSale(productsSold);
  const sale = { id: newSaleId, itemsSold: productsSold };
  return { status: 'CREATED', data: sale };
};

module.exports = {
  listAllSales,
  getSaleById,
  createCompleteSale,
};
