const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const createProduct = async (newProduct) => {
  const columns = getFormattedColumnNames(newProduct);
    const placeholders = getFormattedPlaceholders(newProduct);
    const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;
  
    const [{ insertId }] = await connection.execute(query, [...Object.values(newProduct)]);  

    return insertId;
};

module.exports = {
  findAll,
  findById,
  createProduct,
};