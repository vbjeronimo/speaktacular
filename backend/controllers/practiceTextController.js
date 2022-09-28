const express = require('express');

const getAllPracticeTexts = (req, res) => {
  res.json({ "message": "Connected..."});
}

module.exports = {
  getAllPracticeTexts,
}
