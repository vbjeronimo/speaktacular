import PronunciationPracticeResult from '../js/pronunciationPracticeResult';

describe('generateResult', () => {

  let practiceText;
  let finalTranscript;

  describe('List of wrong or missing words', () => {

    beforeAll(() => {
      practiceText = 'Be the change that you wish to see in the world.';
    });

    it('is empty if no word was captured from the user', () => {
      finalTranscript = '';
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.wrongOrMissingWords.length).toBe(0);
    });

    it('is equal to the list of words in the test text if the user gets all words wrong', () => {
      finalTranscript = 'yellow blue red green';
      let practiceWords = practiceText.replace('\.', '');
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.wrongOrMissingWords).toEqual(practiceWords.split(' '));
    });

    it('is empty if all words in the transcript match the test string', () => {
      finalTranscript = practiceText;
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.wrongOrMissingWords.length).toBe(0);
    });

    it('will not contain any extra words', () => {
      finalTranscript = 'EXTRA WORDS Be the change EXTRA WORDS that you wish to see in the world. EXTRA WORDS';
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.wrongOrMissingWords.length).toBe(0);
    });

    it('count missed words as wrong words', () => {
      finalTranscript = 'Be the change you wish to see the world.';
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.wrongOrMissingWords).toEqual(['that', 'in'])
    });
  });

  describe('Final score', () => {

    beforeAll(() => {
      practiceText = 'one two three four five six seven eight nine ten';
    });

    it('is zero if no word was captured from the user', () => {
      finalTranscript = '';
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.score).toBe(0);
    });

    it('is zero if no word in transcript matches test text', () => {
      finalTranscript = '1 2 3 4 5 6 7 8 9 10';
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.score).toBe(0);
    });

    it('is the ratio of correctly recognized words by the length of the test text', () => {
      finalTranscript = 'one two three four'
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.score).toBe(0.40);
    });

    it('is 100% if all words in transcript match the test text', () => {
      finalTranscript = practiceText;
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.score).toBe(1.00);
    });

    it('is decreased by 2% for each extra word in the transcript', () => {
      finalTranscript = `${practiceText} five extra words in transcript`;
      let practiceResult = new PronunciationPracticeResult(practiceText, finalTranscript);
      expect(practiceResult.score).toBe(0.90);
    });
  });
});
