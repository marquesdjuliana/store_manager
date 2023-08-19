const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders,
  getFormattedUpdateColumns } = require('../utils/generateFormattedQuery');

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
const updateProduct = async (productId, updatedData) => {
  const columns = getFormattedUpdateColumns(updatedData);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;

  await connection.execute(query, [...Object.values(updatedData), productId]);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};