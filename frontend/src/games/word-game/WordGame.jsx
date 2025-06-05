import { Link } from 'react-router-dom';
import styles from './WordGame.module.css';

export default function WordGame() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backButton}>
          ← Back to Games
        </Link>
        <h1>Word Game</h1>
      </header>
      
      <div className={styles.content}>
        <div className={styles.gameMenu}>
          <h2>Welcome to Word Game!</h2>
          <p>Test your vocabulary and quick thinking in this exciting word game.</p>
          
          <div className={styles.buttonGroup}>
            <button className={styles.playButton}>
              Start New Game
            </button>
            <button className={styles.rulesButton}>
              How to Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 