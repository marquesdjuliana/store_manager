const { salesModel } = require('../models');

const listAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.findSaleById(saleId);
  if (!sale) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  listAllSales,
  getSaleById,
};
