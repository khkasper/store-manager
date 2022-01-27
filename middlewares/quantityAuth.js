const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusDictionary');

module.exports = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(BAD_REQUEST).json({
        message: '"quantity" is required',
    });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY).json({
        message: '"quantity" must be a number larger than or equal to 1',
    });
  }

  return next();
};
