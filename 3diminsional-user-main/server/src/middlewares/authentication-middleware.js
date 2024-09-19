const createHttpError = require('http-errors');
const { verifyAccessToken } = require('../libs/jwt');

module.exports = async (req, _, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError.Unauthorized('Authorization header is missing');
    }

    const [, token] = authHeader.split(' ');
 

    if (!token) throw createHttpError.Unauthorized();
    try {
      const payload = verifyAccessToken(token);
      req.payload = payload;
    
      next();
    } catch (error) {
      throw createHttpError.Unauthorized();
    }
  } catch (error) {
    next(error);
  }
};
