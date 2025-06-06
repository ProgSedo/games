import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScrambledWords.module.css';

const ScrambledWords = () => {
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    wordLength: 5,
    timed: true,
    timeLimit: 60,
    useHints: true,
    minWordLength: 3,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backButton}>
          ← Back to Games
        </Link>
        <h1>Scrambled Words</h1>
      </header>

      {!gameStarted ? (
        <div className={styles.content}>
          <div className={styles.gameMenu}>
            <h2>Welcome to Scrambled Words!</h2>
            <p>Unscramble letters to form words in this challenging word puzzle game.</p>
            
            <div className={styles.buttonGroup}>
              <button 
                className={styles.playButton}
                onClick={() => setGameStarted(true)}
              >
                Start New Game
              </button>
              <button 
                className={styles.rulesButton}
                onClick={() => setShowRules(true)}
              >
                How to Play
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.gameMenu}>
            <h2>Game Settings</h2>
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
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={gameSettings.useHints}
                    onChange={(e) => setGameSettings({ ...gameSettings, useHints: e.target.checked })}
                  />
                  Enable Hints
                </label>
              </div>

              <button className={styles.playButton} onClick={() => console.log('Start game with settings:', gameSettings)}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}

      {showRules && (
        <div className={styles.modalOverlay} onClick={() => setShowRules(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>How to Play</h2>
            <ul>
              <li>Choose your game settings (word length, time limit, hints)</li>
              <li>You'll be presented with a scrambled word</li>
              <li>Type possible words using the given letters</li>
              <li>Submit your answers to score points</li>
              <li>Use hints if enabled (may cost points)</li>
              <li>Try to make as many valid words as possible!</li>
            </ul>
            <button className={styles.closeButton} onClick={() => setShowRules(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrambledWords; 