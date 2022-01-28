const connection = require('./connection');

const createSaleDate = async (date) => {
  const query = 'INSERT INTO sales (date) VALUES (?)';
  const [result] = await connection.execute(query, [date]);
  return { id: result.insertId };
};

const create = async (id, productId, quantity) => {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const [salesProducts] = await connection.execute(query, [id, productId, quantity]);
    return { id: salesProducts.insertId };
};

module.exports = {
  createSaleDate,
  create,
};