const express = require('express');

const { logger } = require('../middleware/logger');
const PracticeText = require('../models/PracticeText');

const getAllPracticeTexts = async (req, res) => {
  PracticeText.find({}, function (err, practiceTexts) {
    if (err) return handleError(err, res);
    if (!practiceTexts) return res.status(204).json({ "message": "No practice texts found" });
    
    return res.json(practiceTexts);
  })
}

const getRandomPracticeText = async (req, res) => {
  const count = await PracticeText.count();
  let random = Math.floor(Math.random() * count);

  PracticeText.findOne().skip(random).exec(function (err, randomPracticeText) {
    if (err) return handleError(err, res);

    return res.json(randomPracticeText);
  })
}

const handleError = (err, res) => {
  logger.log('error', err.message);
  res.sendStatus(400).json({ "error": err.message });
}

module.exports = {
  getAllPracticeTexts,
  getRandomPracticeText
}
