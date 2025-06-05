import styles from './RulesModal.module.css';

export default function RulesModal({ onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2>How to Play</h2>
        
        <div className={styles.rulesContainer}>
          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>📖</div>
            <div className={styles.ruleText}>
              <h3>Read the Clue</h3>
              <p>Each round begins with a clue or definition of a word.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>✍️</div>
            <div className={styles.ruleText}>
              <h3>Guess the Word</h3>
              <p>Type the correct word that matches the clue and has the correct number of letters.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>💡</div>
            <div className={styles.ruleText}>
              <h3>Ask for Letters</h3>
              <p>If you're stuck, you can request one letter at a time—but it may cost you points.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>⏱️</div>
            <div className={styles.ruleText}>
              <h3>Beat the Clock</h3>
              <p>You have limited time to answer all clues. Think fast!</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>🎯</div>
            <div className={styles.ruleText}>
              <h3>Score Points</h3>
              <p>Earn more points by guessing correctly with fewer hints.</p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.readyText}>Ready to test your vocabulary? Let's play!</p>
          <button className={styles.startButton} onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
} 