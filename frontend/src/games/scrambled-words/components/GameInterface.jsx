import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameInterface.module.css';
import wordlist from "../../../data_storage/wordnet_dump.json";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function firstIndexByLength(arr, n) {
  let lowIndex = 0, highIndex = arr.length - 1;
  while (highIndex > lowIndex) {
    const mid = Math.floor((lowIndex + highIndex) / 2);
    const len = arr[mid].word.length;
    if (len < n)
      lowIndex = mid + 1;
    else
      highIndex = mid;
  }
  return arr[lowIndex].word.length === n ? lowIndex : -1;
}

function lastIndexByLength(arr, n) {
  let lowIndex = 0, highIndex = arr.length - 1;
  while (highIndex > lowIndex) {
    const mid = Math.floor((lowIndex + highIndex) / 2);
    const len = arr[mid + 1].word.length;
    if (len > n)
      highIndex = mid;
    else
      lowIndex = mid + 1;
  }
  return arr[lowIndex].word.length === n ? lowIndex : -1;
}

function scrambleWord(word) {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('');
}

function findAllPossibleWords(letters, wordList) {
  const letterCount = {};
  letters.toLowerCase().split('').forEach(letter => {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  });

  return wordList.filter(wordObj => {
    const word = wordObj.word.toLowerCase();
    if (word.length < 3 || word.length > letters.length) return false;
    
    const wordLetterCount = {};
    for (let letter of word) {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
      if (wordLetterCount[letter] > (letterCount[letter] || 0)) {
        return false;
      }
    }
    return true;
  });
}

export default function GameInterface({ settings, onGameEnd }) {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState('');
  const [possibleWords, setPossibleWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize game with a random word
    initializeGame();
  }, []);

  useEffect(() => {
    if (settings.timed && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (settings.timed && timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameOver, settings.timed]);

  const initializeGame = () => {
    const firstIndex = firstIndexByLength(wordlist, settings.wordLength);
    const lastIndex = lastIndexByLength(wordlist, settings.wordLength);
    
    if (firstIndex === -1 || lastIndex === -1) return;
    
    const randomIndex = getRandomInt(firstIndex, lastIndex);
    const selectedWord = wordlist[randomIndex];
    
    setCurrentWord(selectedWord.word);
    setScrambledLetters(scrambleWord(selectedWord.word));
    
    const possible = findAllPossibleWords(selectedWord.word, wordlist);
    setPossibleWords(possible);
    setFoundWords([]);
    setScore(0);
    setHintsUsed(0);
    setHint('');
    setMessage('');
    setGameOver(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = userInput.toLowerCase().trim();
    
    if (!word) return;
    
    if (foundWords.some(foundWord => foundWord.word.toLowerCase() === word)) {
      setMessage('Word already found!');
      setUserInput('');
      return;
    }
    
    const validWord = possibleWords.find(w => w.word.toLowerCase() === word);
    if (validWord) {
      const newFoundWords = [...foundWords, validWord];
      setFoundWords(newFoundWords);
      
      // Calculate score based on word length
      const wordScore = word.length * 10;
      setScore(score + wordScore);
      
      setMessage(`Great! +${wordScore} points`);
      setUserInput('');
      
      // Check if all words found
      if (newFoundWords.length === possibleWords.length) {
        setMessage('Congratulations! You found all words!');
        setTimeout(() => endGame(), 2000);
      }
    } else {
      setMessage('Not a valid word with these letters!');
      setUserInput('');
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  const getHint = () => {
    if (!settings.useHints) return;
    
    const unfoundWords = possibleWords.filter(
      word => !foundWords.some(found => found.word.toLowerCase() === word.word.toLowerCase())
    );
    
    if (unfoundWords.length === 0) return;
    
    const randomWord = unfoundWords[getRandomInt(0, unfoundWords.length - 1)];
    const wordLength = randomWord.word.length;
    const firstLetter = randomWord.word[0].toUpperCase();
    
    setHint(`Try a ${wordLength}-letter word starting with "${firstLetter}"`);
    setHintsUsed(hintsUsed + 1);
    
    // Deduct points for using hint
    setScore(Math.max(0, score - 5));
    
    setTimeout(() => setHint(''), 5000);
  };

  const endGame = () => {
    setGameOver(true);
    const finalScore = Math.max(0, score - (hintsUsed * 5));
    setScore(finalScore);
  };

  const restartGame = () => {
    setTimeLeft(settings.timeLimit);
    initializeGame();
  };

  if (gameOver) {
    return (
      <div className={styles.gameOver}>
        <h2>Game Over!</h2>
        <div className={styles.finalStats}>
          <p>Final Score: <span className={styles.score}>{score}</span></p>
          <p>Words Found: <span className={styles.wordsFound}>{foundWords.length}/{possibleWords.length}</span></p>
          <p>Hints Used: <span className={styles.hintsUsed}>{hintsUsed}</span></p>
        </div>
        
        <div className={styles.foundWordsList}>
          <h3>Words You Found:</h3>
          <div className={styles.wordsGrid}>
            {foundWords.map((word, index) => (
              <div key={index} className={styles.foundWord}>
                {word.word} ({word.word.length * 10} pts)
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.missedWordsList}>
          <h3>Words You Missed:</h3>
          <div className={styles.wordsGrid}>
            {possibleWords
              .filter(word => !foundWords.some(found => found.word.toLowerCase() === word.word.toLowerCase()))
              .map((word, index) => (
                <div key={index} className={styles.missedWord}>
                  {word.word}
                </div>
              ))}
          </div>
        </div>
        
        <div className={styles.gameOverButtons}>
          <button className={styles.playAgainButton} onClick={restartGame}>
            Play Again
          </button>
          <button className={styles.backButton} onClick={() => onGameEnd()}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gameInterface}>
      <div className={styles.gameHeader}>
        <div className={styles.gameStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Score:</span>
            <span className={styles.statValue}>{score}</span>
          </div>
          {settings.timed && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Time:</span>
              <span className={styles.statValue}>{timeLeft}s</span>
            </div>
          )}
          <div className={styles.stat}>
            <span className={styles.statLabel}>Found:</span>
            <span className={styles.statValue}>{foundWords.length}/{possibleWords.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.gameContent}>
        <div className={styles.scrambledWord}>
          <h2>Unscramble these letters:</h2>
          <div className={styles.letters}>
            {scrambledLetters.split('').map((letter, index) => (
              <span key={index} className={styles.letter}>
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a word..."
            className={styles.wordInput}
            autoComplete="off"
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>

        {settings.useHints && (
          <button onClick={getHint} className={styles.hintButton}>
            Get Hint (-5 points)
          </button>
        )}

        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}

        {hint && (
          <div className={styles.hint}>
            💡 {hint}
          </div>
        )}

        <div className={styles.foundWordsSection}>
          <h3>Found Words ({foundWords.length}):</h3>
          <div className={styles.foundWordsGrid}>
            {foundWords.map((word, index) => (
              <div key={index} className={styles.foundWordItem}>
                <span className={styles.wordText}>{word.word}</span>
                <span className={styles.wordPoints}>+{word.word.length * 10}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
