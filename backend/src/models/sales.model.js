const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM sales s '
    + 'JOIN sales_products sp ON s.id = sp.sale_id '
    + 'ORDER BY saleId, productId',
  );
  return camelize(sales);
};

const findSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM sales s '
    + 'JOIN sales_products sp ON s.id = sp.sale_id '
    + 'WHERE s.id = ? '
    + 'ORDER BY productId',
    [saleId],
  );
  return camelize(sale);
};

module.exports = {
  findAllSales,
  findSaleById,
};
