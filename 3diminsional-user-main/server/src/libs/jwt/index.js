const { sign, verify } = require('jsonwebtoken');

const jwtAccessKey = process.env.JWT_ACCESS_KEY;
const jwtRefreshToken = process.env.JWT_REFRESH_KEY;

module.exports = {
  generateAccessToken(userId) {
    return sign(userId, jwtAccessKey, { expiresIn: '15m' });
  },

  generateRefreshToken(userId) {
    return sign(userId, jwtRefreshToken, { expiresIn: '30days' });
  },

  verifyAccessToken(token) {
    return verify(token, jwtAccessKey);
  },

  verifyRefershToken(token) {
    return verify(token, jwtRefreshToken);
  },
};
