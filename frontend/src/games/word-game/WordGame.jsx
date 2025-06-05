import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './WordGame.module.css';
import RulesModal from './components/RulesModal';
import GameInterface from './components/GameInterface';

export default function WordGame() {
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backButton}>
          ← Back to Games
        </Link>
        <h1>Word Game</h1>
      </header>
      
      {!gameStarted ? (
        <div className={styles.content}>
          <div className={styles.gameMenu}>
            <h2>Welcome to Word Game!</h2>
            <p>Test your vocabulary and quick thinking in this exciting word game.</p>
            
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
        <GameInterface />
      )}

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
} 