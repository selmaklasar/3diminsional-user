const mongoose = require('mongoose');
const logger = require('../logger');
require('dotenv').config();


const mongodbUri = process.env.MONGODB_URI;


const dbTimeOut = process.env.DB_TIME_OUT ||120000;

module.exports = async function () {
  try {
    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: dbTimeOut,
    });
    logger.info('Connected to mongodb server! 🍃');
  } catch (error) {
    logger.error("database error",error);
  }
};

