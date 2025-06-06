import { useState, useEffect, useRef } from 'react';
import styles from './GameInterface.module.css';

export default function GameInterface() {
  const [currentWord, setCurrentWord] = useState('EXAMPLE'); // This will be dynamic later
  const [timer, setTimer] = useState(120); // 2 minutes per question
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestionScore, setCurrentQuestionScore] = useState(500);

  // Create array of empty letter boxes based on word length
  const letterBoxes = Array(currentWord.length).fill('');

  const [guessedLetters , setGuessedLetters] = useState(Array(currentWord.length).fill(''))
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setGuessedLetters(Array(currentWord.length).fill(''));
    inputRefs.current = [];
  }, [currentWord]);

  const handleChange = (e, index) => {
    const newLetters = [...guessedLetters];
    newLetters[index] = e.target.value.toUpperCase();
    setGuessedLetters(newLetters);

    if(e.target.value && inputRefs.current[index+1]){
      setActiveIndex(index+1);
      inputRefs.current[index+1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace'){
      const newLetters = [...guessedLetters];

      if(guessedLetters[index]){
        newLetters[index] = '';
        setGuessedLetters(newLetters);
      }
      else if(index > 0 && guessedLetters[index] === ''){
        newLetters[index-1] = '';
        setGuessedLetters(newLetters);
      }
      if(index > 0){
        inputRefs.current[index-1].focus();
        setActiveIndex(index-1);
      }
    }

    if(e.key === 'Enter'){
      if(index !== currentWord.length-1 || guessedLetters[index] === ''){
        // Shake the boxes and give an error sound
      }
      else{
        const guess = guessedLetters.join('');
        console.log("Submitted: ", guess);
        // TODO
      }
    }
  }

  return (
    <div className={styles.gameInterface}>
      <div className={styles.topBar}>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Total Score</span>
            <span className={styles.scoreValue}>{totalScore}</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Question Value</span>
            <span className={styles.scoreValue}>{currentQuestionScore}</span>
          </div>
        </div>
        <div className={styles.timer}>
          <span className={styles.timerValue}>
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className={styles.clueContainer}>
        <p className={styles.clue}>
          This is where the clue for the current word will be displayed. It will contain the definition or hint for the word the player needs to guess.
        </p>
      </div>

      <div className={styles.wordContainer}>
        <div 
          className={styles.letterBoxes}
          style={{ '--word-length': currentWord.length }}
        >
          {letterBoxes.map((_, index) => (
            <div key={index} className={styles.letterBox}>
              <div className={styles.hexagon}>
                <span className={styles.letter}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {guessedLetters.map((letter, index) => (
              <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={letter}
                  onMouseDown={(e) => {
                    if (index !== activeIndex) {
                      e.preventDefault(); // prevent default focus behavior
                      inputRefs.current[activeIndex]?.focus(); // force focus to the active box
                    }
                  }}
                  onPaste={(e) => e.preventDefault()}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={el => inputRefs.current[index] = el}
                  className={styles.letterInput}
              />
          ))}
        </div>
        <button className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
} 