const express = require('express');
const router = express.Router();

const practiceTextController = require('../../controllers/practiceTextController.js');

router.route('/')
  .get(practiceTextController.getAllPracticeTexts)

router.route('/random')
  .get(practiceTextController.getRandomPracticeText)

module.exports = router;
