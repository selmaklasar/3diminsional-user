const createResponseObject = require('../utils/create-response-object');

module.exports = (_, res, next) => {
  res.formatResponse = (
    data,
    message = 'Operation completed successfully! 👍'
  ) => res.json(createResponseObject({ success: true, message, data }));
  next();
};
