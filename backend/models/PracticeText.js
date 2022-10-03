const mongoose = require('mongoose');
const { Schema } = mongoose;

const supportedLanguages = [
  "english"
];

const practiceTextSchema = new Schema({
  text: {
    type: String,
    required:true,
    minLength: 1
  },
  author: String,
  language: {
    type: String,
    default: "english",
    validate: {
      validator: value => supportedLanguages.indexOf(value) !== -1,
      message: props => `${props.value} is not in the list of supported languages.`
    }
  }
});

module.exports = mongoose.model('practice_text', practiceTextSchema);
