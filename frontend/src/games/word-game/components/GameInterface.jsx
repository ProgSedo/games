import { useState, useEffect, useRef } from 'react';
import styles from './GameInterface.module.css';
import { useNavigate } from 'react-router-dom';

export default function GameInterface() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState('EXAMPLEe'); // This will be dynamic later
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestionScore, setCurrentQuestionScore] = useState(500);

  // Ata's wonderful code
  //const letterBoxes = Array(currentWord.length).fill('');

  const [guessedLetters , setGuessedLetters] = useState(Array(currentWord.length).fill(''))
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Each time the current word changes, the focus is renewed and array is emptied
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

  const [timer, setTimer] = useState(5); // 2 minutes per question
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if(timer <= 0){
      setGameOver(true);
    }
    else{
      const interval = setInterval(() => {
        setTimer(prev => prev -1);
      },1000);

      return () => clearInterval(interval)
    }
  }, [timer]);

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
      <div className={styles.inputContainer}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {guessedLetters.map((letter, index) => (
            <div key={index} className={styles.hexagonWrapper}>
              <div key={index} className={styles.hexagon}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.submitButton}
              onClick={() => {
                inputRefs.current[activeIndex].focus();
                //TODO
              }}
      >
        Submit
      </button>

      {gameOver && <div className={styles.popupOverlay}>
        <div className={styles.popupBox}>
          <h2> Game Over! </h2>
          <p> Game Statistics </p>
          <div className={styles.popupButtons}>
            <button
              onClick={() =>{
                navigate("/")
            }}>
              Return Home
            </button>
            <button onClick={()=>{
              //TODO
            }}>
              Play Again
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
} 