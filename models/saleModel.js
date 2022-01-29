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

const getAll = async () => {
  const query = `
    SELECT sale_id AS saleId, date, product_id, quantity
    FROM sales_products sp
    JOIN sales s
      ON sp.sale_id = s.id
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT date, product_id, quantity
    FROM sales_products sp
    JOIN sales s
      ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
  `;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const update = async (id, productId, quantity) => {
  const query = `
    UPDATE sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
  `;
  const [{ affectedRows }] = await connection.execute(query, [quantity, id, productId]);
  return { affectedRows };
};

const remove = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [id]);
  return { affectedRows };
};

module.exports = {
  createSaleDate,
  create,
  getAll,
  getById,
  update,
  remove,
};