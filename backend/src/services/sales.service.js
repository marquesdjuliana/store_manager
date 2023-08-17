const { salesModel } = require('../models');
const validate = require('../validations/validationsInputValues');

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
  const error = validate.validateSale(productsSold);
  if (error) return { status: error.status, data: { message: error.message } };
  const newSaleId = await salesModel.createCompleteSale(productsSold);
  const sale = { id: newSaleId, itemsSold: productsSold };
  return { status: 'CREATED', data: sale };
};

module.exports = {
  listAllSales,
  getSaleById,
  createCompleteSale,
};
