const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listAllSales = async (_req, res) => {
  const { status, data } = await salesService.listAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSaleById = async (req, res) => {
  const saleId = Number(req.params.id);
  const { status, data } = await salesService.getSaleById(saleId);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listAllSales,
  getSaleById,
};
