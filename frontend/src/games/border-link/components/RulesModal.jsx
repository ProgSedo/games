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
              <h3>Start and End</h3>
              <p>Starting and ending points for the route is given.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>✍️</div>
            <div className={styles.ruleText}>
              <h3>Enter a Country</h3>
              <p>Each time you can type a country that has a border with the already entered countries.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>💡</div>
            <div className={styles.ruleText}>
              <h3>Ask For a Clue</h3>
              <p>If you're stuck, you can request a clue.</p>
            </div>
          </div>

          <div className={styles.ruleItem}>
            <div className={styles.ruleIcon}>⏱️</div>
            <div className={styles.ruleText}>
              <h3>Find the Shortes Route</h3>
              <p>The less countries entered, the more points are gained. </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.readyText}>Ready to test your geographical knowledge?</p>
          <button className={styles.startButton} onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
} 