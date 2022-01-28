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

const update = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  const [product] = await connection.execute(query, [name, quantity, id]);
  return product.affectedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product.affectedRows;
};

module.exports = {
  create,
  getByName,
  getById,
  getAll,
  update,
  remove,
};