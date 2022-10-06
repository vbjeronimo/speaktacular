import { useContext, useEffect, useRef, useState } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import PronunciationPracticeResult from '../js/pronunciationPracticeResult';
import UserContext from '../contexts/userContext';

const APP_ID = process.env.REACT_APP_SPEECHLY_APP_ID;
const API_URL = process.env.REACT_APP_API_URL + 'practice-texts/random';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Home = () => {
  const [practiceText, setPracticeText] = useState('');
  const user = useContext(UserContext);
  const practiceResult = useRef({});
  const effectRan = useRef(false);

  const {
    transcript,
    resetTranscript
  } = useSpeechRecognition();

  /*
   * Since React 18 there is a development-only check that automatically
   * unmounts and remounts every component, therefore running the code
   * inside the 'useEffect' twice. The 'effectRan' ref is a short-term
   * fix to this issue.
  */
  useEffect(() => {
    if (effectRan.current === false) {
      const fetchPracticeText = async () => {
        await fetch(API_URL, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            setPracticeText(data.text);
          })
          .catch((err) => {
            console.error(err.message);
          })
      }

      fetchPracticeText();

      return () => {
        effectRan.current = true;
      }
    }
  }, []);

  function handlePracticeTextChange(newText) {
    setPracticeText(newText);
  }

  function handleStartPractice() {
    SpeechRecognition.startListening();
  }

  function handleStopPractice() {
    SpeechRecognition.stopListening();
    practiceResult.current = new PronunciationPracticeResult(practiceText, transcript);
    console.log(practiceResult.current);
    resetTranscript();
  }

  return (
    <main>
      <textarea
        value={practiceText}
        onChange={(e) => { handlePracticeTextChange(e.target.value) }}
        cols={30}
        rows={10} />
      <button onClick={handleStartPractice}>Start</button>
      <button onClick={handleStopPractice}>Stop</button>
    </main>
  );
}

export default Home;
