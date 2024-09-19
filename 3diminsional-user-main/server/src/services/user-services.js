const User = require('../models/User');

module.exports = {
  async createUser(userData) {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  },

  async findUser(conditions) {
    const user = await User.findOne(conditions);
    return user;
  },

  async findUserWithId(id) {
    const user = await User.findById(id);
    return user;
  },
};

