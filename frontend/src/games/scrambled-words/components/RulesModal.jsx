import styles from './RulesModal.module.css';

export default function RulesModal({ onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2>How to Play</h2>
        
        <div className={styles.rulesContainer}>
          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>⚙️</div>
            <div className={styles.ruleText}>
              <h3>Choose Settings</h3>
              <p>Select word length, time limit, and whether to enable hints for your game.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>🔠</div>
            <div className={styles.ruleText}>
              <h3>Get Scrambled Word</h3>
              <p>You'll be presented with a set of scrambled letters to unscramble.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>✍️</div>
            <div className={styles.ruleText}>
              <h3>Make Words</h3>
              <p>Type and submit valid words using only the letters provided.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>⏱️</div>
            <div className={styles.ruleText}>
              <h3>Beat the Clock</h3>
              <p>You have limited time to find as many words as possible. Think fast!</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>🎯</div>
            <div className={styles.ruleText}>
              <h3>Score Points</h3>
              <p>Earn more points by finding longer words and using fewer hints.</p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.readyText}>Ready to test your word skills? Let's play!</p>
          <button className={styles.startButton} onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
} 