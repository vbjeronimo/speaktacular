const mongoose = require('mongoose');
const { Schema, Model } = mongoose;

const practiceTextSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required:true
  }
});

module.exports = Model('PracticeText', practiceTextSchema);
