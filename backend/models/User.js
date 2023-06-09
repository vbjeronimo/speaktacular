const mongoose = require('mongoose');
const { Schema } = mongoose;

const wrongWordSchema = new Schema({
  word: String,
  correctPronunciations: Number
})

const statisticsSchema = new Schema({
  wrongWords: {
    type: [wrongWordSchema],
    default: []
  },
  pastScores: {
    type: [Number],
    default: []
  }
},
  {
    virtuals: {
      averageScore: {
        get() {
          let scoreCount = this.pastScores.length;
          if (scoreCount === 0) {
            return 0;
          }

          let scoreSum = 0;
          this.pastScores.forEach((score) => {
            scoreSum += score;
          });

          return scoreSum / scoreCount;
        }
      },
      practicesCompleted: {
        get() {
          return this.wrongWords.length;
        }
      }
    }
  });

const userSchema = new Schema({
  emailAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  dateJoined: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  statistics: statisticsSchema,
  refreshToken: String
});

module.exports = mongoose.model('user', userSchema);
