import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ScrambledWords.module.css';
import GameInterface from './components/GameInterface';
import RulesModal from './components/RulesModal';

const ScrambledWords = () => {
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    wordLength: 5,
    timed: true,
    timeLimit: 60,
    useHints: true,
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
                onClick={() => setShowSettings(true)}
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
      ) : gameStarted ? (
        <GameInterface 
          settings={gameSettings} 
          onGameEnd={() => {
            setGameStarted(false);
            setShowSettings(false);
          }} 
        />
      ) : null}

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      
      {showSettings && (
        <div className={styles.modalOverlay} onClick={() => setShowSettings(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
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
                  <option value={8}>8 Letters</option>
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
                    <option value={180}>180</option>
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

              <div className={styles.buttonGroup}>
                <button 
                  className={styles.playButton} 
                  onClick={() => {
                    setShowSettings(false);
                    setGameStarted(true);
                  }}
                >
                  Start Game
                </button>
                <button 
                  className={styles.cancelButton} 
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrambledWords;