const connection = require('./connection');

const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [product] = await connection.execute(query, [name, quantity]);
  return { id: product.insertId };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [[products]] = await connection.execute(query, [name]);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

module.exports = {
  create,
  getByName,
  getById,
  getAll,
};