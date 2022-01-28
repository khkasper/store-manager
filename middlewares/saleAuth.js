const serialize = require('../utils/serialize');
const { BAD_REQUEST } = require('../utils/statusDictionary');

module.exports = (req, res, next) => {
  const sales = serialize(req.body);
  const notProductId = sales.some(({ productId }) => productId === undefined);

  if (notProductId) {
    return res.status(BAD_REQUEST).json({
      message: '"product_id" is required',
    });
  }

  return next();
};