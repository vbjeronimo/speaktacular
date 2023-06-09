class PronunciationPracticeResult {
  constructor(practiceText, finalTranscript) {
    this.practiceWords = this._getWordListFromString(practiceText);
    this.transcriptWords = this._getWordListFromString(finalTranscript);
    this.lengthDifference = Math.abs(this.practiceWords.length - this.transcriptWords.length) || 1;
    this.score = 0;
    this.wrongOrMissingWords = [];

    this._generateResult();
  }

  _getWordListFromString(str) {
    if (str.length === 0) {
      return [];
    }

    const regex = /[\,\.\:\?\!\;\n\r]/g;
    let formattedString = str.replace(regex, '');
    let wordsFromString = formattedString.split(' ');

    return wordsFromString;
  }

  _generateResult() {
    if (this.practiceWords.length === 0 || this.transcriptWords.length === 0) {
      return;
    }

    this._checkForWrongOrMissingWords();
    this._calculateScore();
  }

  _checkForWrongOrMissingWords() {
    let i = 0;
    let j = 0;
    while (i < this.practiceWords.length) {
      if (j >= this.transcriptWords.length) {
        let practiceWordsRemainder = this.practiceWords.slice(i)
        let finalWrongWords = this.wrongOrMissingWords.concat(practiceWordsRemainder);
        this.wrongOrMissingWords = finalWrongWords;
        break;
      }

      if (this.practiceWords[i].toLowerCase() === this.transcriptWords[j].toLowerCase()) {
        i++
        j++;
        continue;
      }

      let rangeEnd = (j + this.lengthDifference < this.transcriptWords.length) ? j + this.lengthDifference : this.transcriptWords.length;
      let matchFound = false;
      for (let t = j + 1; t <= rangeEnd; t++) {
        if (this.transcriptWords[t] !== undefined && this.practiceWords[i].toLowerCase() === this.transcriptWords[t].toLowerCase()) {
          matchFound = true;
          j = t;
          i++
          j++;
          break;
        }
      }
      if (!matchFound) {
        this.wrongOrMissingWords.push(this.practiceWords[i]);
        i++;
      }
    }
  }

  _calculateScore() {
    let percentageWrong = (this.wrongOrMissingWords.length / this.practiceWords.length);
    let extraWordsPenality = (this.transcriptWords.length > this.practiceWords.length) ? (this.lengthDifference * 2) / 100 : 0;
    let finalScore = 1 - percentageWrong - extraWordsPenality;
    this.score = Number(finalScore.toFixed(2));
  }
}

export default PronunciationPracticeResult;
