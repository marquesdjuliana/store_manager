const connection = require('./connection');

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

const createProduct = async (productName) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [productName],
  );
  return { status: 'CREATED', data: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};