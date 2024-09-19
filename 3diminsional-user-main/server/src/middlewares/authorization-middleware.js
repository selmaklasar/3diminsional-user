const createHttpError = require('http-errors');
const userServices = require('../services/user-services');

module.exports = (userType) => async (req, _, next) => {
  try {
    const { userId } = req.payload;
    const user = await userServices.findUserWithId(userId);
    if (!user) throw createHttpError.Unauthorized();
    if (user.userType !== userType) throw createHttpError.Forbidden();
    next();
  } catch (error) {
    next(error);
  }
};
