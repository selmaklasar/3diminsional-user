const { hash, compare } = require('bcrypt');

const saltRounds = 12;

module.exports = {
  hashPassword(password) {
    return hash(password, saltRounds);
  },

  checkPassword(password, hashedPassword) {
    return compare(password, hashedPassword);
  },
};
