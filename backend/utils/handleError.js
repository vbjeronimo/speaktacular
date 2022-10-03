const express = require('express');
const { logger } = require('../middleware/logger.js');

const handleError = (err, res) => {
  logger.log('error', err.message);
  res.sendStatus(500).json({ "error": err.message });
}

module.exports = handleError;
