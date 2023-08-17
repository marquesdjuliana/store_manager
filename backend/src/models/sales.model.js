const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames,
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, 
    date, product_id, quantity FROM sales_products 
    INNER JOIN sales s
    ON s.id = sale_id 
    ORDER BY sale_id, product_id`,
  );
  return camelize(sales);
};

const findSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales_products 
    INNER JOIN sales s
    ON s.id = sale_id 
    WHERE id = ?
    ORDER BY product_id`,
    [saleId],
  );
  return camelize(sale);
};

const createProductForTableSalesProducts = async (productsSold, saleId) => {
  const insertPromises = productsSold.map((product) => {
    const columns = getFormattedColumnNames(product);
    const placeholders = getFormattedPlaceholders(product);
    const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES (?, ${placeholders})`;
    return connection.execute(query, [saleId, ...Object.values(product)]);
  });

  await Promise.all(insertPromises);
};
const createCompleteSale = async (sale) => {
  const query = 'INSERT INTO sales () VALUE ()';
  const [{ insertId }] = await connection.execute(query);
  await createProductForTableSalesProducts(sale, insertId);
  return insertId;
};
module.exports = {
  findAllSales,
  findSaleById,
  createCompleteSale,
};
