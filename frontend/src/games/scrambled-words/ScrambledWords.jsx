import { useState } from 'react';
import styles from './ScrambledWords.module.css';

const ScrambledWords = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    wordLength: 5,
    timed: true,
    timeLimit: 60,
    useHints: true,
    minWordLength: 3,
  });

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const toggleHowToPlay = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  if (!gameStarted) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Scrambled Words</h1>
        <div className={styles.menuButtons}>
          <button className={styles.button} onClick={handleStartGame}>
            Start New Game
          </button>
          <button className={styles.button} onClick={toggleHowToPlay}>
            How to Play
          </button>
        </div>

        {showHowToPlay && (
          <div className={styles.howToPlay}>
            <h2>How to Play</h2>
            <ul>
              <li>Choose your game settings (word length, time limit, hints)</li>
              <li>You'll be presented with a scrambled word</li>
              <li>Type possible words using the given letters</li>
              <li>Submit your answers to score points</li>
              <li>Use hints if enabled (may cost points)</li>
              <li>Try to make as many valid words as possible!</li>
            </ul>
            <button className={styles.closeButton} onClick={toggleHowToPlay}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Settings</h1>
      <div className={styles.settingsForm}>
        <div className={styles.settingGroup}>
          <label>Word Length:</label>
          <select
            value={gameSettings.wordLength}
            onChange={(e) => setGameSettings({ ...gameSettings, wordLength: Number(e.target.value) })}
          >
            <option value={4}>4 Letters</option>
            <option value={5}>5 Letters</option>
            <option value={6}>6 Letters</option>
            <option value={7}>7 Letters</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label>Game Mode:</label>
          <select
            value={gameSettings.timed}
            onChange={(e) => setGameSettings({ ...gameSettings, timed: e.target.value === 'true' })}
          >
            <option value="true">Timed</option>
            <option value="false">Untimed</option>
          </select>
        </div>

        {gameSettings.timed && (
          <div className={styles.settingGroup}>
            <label>Time Limit (seconds):</label>
            <select
              value={gameSettings.timeLimit}
              onChange={(e) => setGameSettings({ ...gameSettings, timeLimit: Number(e.target.value) })}
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
              <option value={120}>120</option>
            </select>
          </div>
        )}

        <div className={styles.settingGroup}>
          <label>
            <input
              type="checkbox"
              checked={gameSettings.useHints}
              onChange={(e) => setGameSettings({ ...gameSettings, useHints: e.target.checked })}
            />
            Enable Hints
          </label>
        </div>

        <button className={styles.startButton} onClick={() => console.log('Start game with settings:', gameSettings)}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default ScrambledWords; 