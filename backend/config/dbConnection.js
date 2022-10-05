const mongoose = require('mongoose');
const { logger } = require('../middleware/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    logger.log('error', err.message);
  }
}

module.exports = connectDB;
