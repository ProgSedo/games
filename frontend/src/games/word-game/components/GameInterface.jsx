import { useState, useEffect, useRef } from 'react';
import styles from './GameInterface.module.css';
import { useNavigate } from 'react-router-dom';
import wordlist from "../../../data_storage/wordnet_dump.json";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function firstIndexByLength(arr, n){
  let lowIndex = 0, highIndex = arr.length -1;
  while(highIndex > lowIndex){
    const mid = Math.floor((lowIndex + highIndex) / 2);
    const len = arr[mid].word.length;
    if(len < n)
      lowIndex = mid+1;
    else
      highIndex = mid;
  }
  return arr[lowIndex].word.length === n ? lowIndex : -1;
}

function lastIndexByLength(arr, n){
  let lowIndex = 0, highIndex = arr.length -1;
  while(highIndex > lowIndex){
    const mid = Math.floor((lowIndex + highIndex) / 2);
    const len = arr[mid+1].word.length;
    if(len > n)
      highIndex = mid;
    else
      lowIndex = mid+1;
  }
  return arr[lowIndex].word.length === n ? lowIndex : -1;
}

export default function GameInterface() {
  const navigate = useNavigate();

  /**
   * Selected words for the game
   */
  const [wordList, setWordList] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [meaningOfWord, setMeaningOfWord] = useState("");
  const [totalPoint, setTotalPoint] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);

  useEffect(()=>{
    const selected = [];
    for(let i = 4; i <= 12; i++){
      const firstIndex = firstIndexByLength(wordlist, i);
      const lastIndex = lastIndexByLength(wordlist, i);

      if (firstIndex === -1 || lastIndex === -1)
        console.log("First and last index error");
      if (lastIndex - firstIndex + 1 < 2)
        console.log("Not enough words");

      const s = new Set();
      while(s.size < 2){
        s.add(getRandomInt(firstIndex,lastIndex));
      }
      while(s.size > 0){
        const index = s.values().next().value;
        selected.push({
          word: wordlist[index].word,
          meaning: wordlist[index].definition
        });
        s.delete(index);
      }
    }
    setWordList(selected);
  }, []);

  useEffect(()=>{
    if(!wordList) return;
    inputRefs.current = [];
    setTotalPoint(prev => prev + currentPoint);
    setCurrentPoint(wordList[wordIndex].word.length * 100);
    setGuessedLetters(Array(wordList[wordIndex].word.length).fill(''));
    setMeaningOfWord(wordList[wordIndex].meaning);
    setActiveIndex(0);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
    setWrongAnswer(false);
    setGivenLetters(Array(wordList[wordIndex].word.length).fill(''));
  }, [wordIndex, wordList])

  const nextWord = () => {
    if(wordIndex === wordList.length - 1){
      setTotalPoint(prev => prev + currentPoint);
      setGameOver(true);
    }
    else{
      setWordIndex(prev => prev + 1);
    }
  }

  const [wrongAnswer, setWrongAnswer] = useState(false);

  const wrongAnswerWarning = () => {
    setWrongAnswer(true);
    inputRefs.current[activeIndex]?.focus();
  }

  const evaluateTheAnswer = () => {
    if(guessedLetters.join('').toUpperCase() === wordList[wordIndex].word.toUpperCase())
      nextWord();
    else
      wrongAnswerWarning();
  }

  const provideLetter = () => {
    const ungivenLetterNumber = givenLetters.filter(letter => letter === '').length;
    if(ungivenLetterNumber === 0) return;
    let index = getRandomInt(0, ungivenLetterNumber-1);
    for(let i = 0; i < wordList[wordIndex].word.length; i++){
      if(givenLetters[i] === ''){
        if(index === 0){
          index = i;
          break;
        }
        index--;
      }
    }
    const newGivenLetters = [...givenLetters];
    newGivenLetters[index] = wordList[wordIndex].word[index].toUpperCase();
    setGivenLetters(newGivenLetters);
    setCurrentPoint(prev => prev - 100);
  }

  /**
   * Entering the letters to guess the word
   */
  const [guessedLetters , setGuessedLetters] = useState([]);
  const [givenLetters, setGivenLetters] = useState([]);
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
      if(index !== wordList[wordIndex].word.length-1 || guessedLetters[index] === ''){
        // Shake the boxes and give an error sound
      }
      else{
        evaluateTheAnswer();
      }
    }
  }

  /**
   * Timer for the game
   */
  const [timer, setTimer] = useState(120); // 2 minutes per question
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
            <span className={styles.scoreValue}>{totalPoint}</span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Question Value</span>
            <span className={styles.scoreValue}>{currentPoint}</span>
          </div>
        </div>
        <div className={styles.scoreContainer}>
          <button className={styles.requestLetterButton}
            onClick={() => {
              provideLetter();
              inputRefs.current[activeIndex]?.focus();
            }}
          >
            Request Letter
          </button>
          <div className={styles.timer}>
            <span className={styles.timerValue}>
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.clueContainer}>
        <p className={styles.clue}>
          {meaningOfWord}
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
                  placeholder={givenLetters[index]}
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
          evaluateTheAnswer();
        }}
      >
        Submit
      </button>
      {wrongAnswer && <p style={{color: 'black'}}>
        The current word is {wordList?.[wordIndex]?.word || "Loading..."}
      </p>}

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