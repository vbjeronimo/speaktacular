const express = require('express');
const router = express.Router();

const practiceTextController = require('../../controllers/practiceTextController');

router.route('/')
  .get(practiceTextController.getAllPracticeTexts);

module.exports = router;
