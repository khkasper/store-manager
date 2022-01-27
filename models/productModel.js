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

module.exports = {
  create,
  getByName,
};