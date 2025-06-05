import { useState, useEffect } from 'react';
import styles from './GameInterface.module.css';

export default function GameInterface() {
  const [currentWord, setCurrentWord] = useState('EXAMPLE'); // This will be dynamic later
  const [timer, setTimer] = useState(120); // 2 minutes per question
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestionScore, setCurrentQuestionScore] = useState(500);

  // Create array of empty letter boxes based on word length
  const letterBoxes = Array(currentWord.length).fill('');

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
        <input
          type="text"
          className={styles.wordInput}
          placeholder="Type your answer here..."
          maxLength={12}
        />
        <button className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
} 