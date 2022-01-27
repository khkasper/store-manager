const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusDictionary');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(BAD_REQUEST).json({
        message: '"name" is required',
    });
  }

  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY).json({
        message: '"name" length must be at least 5 characters long',
    });
  }

  return next();
};