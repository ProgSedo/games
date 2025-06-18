import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styles from "./BorderLink.module.css"
import GameInterface from "../border-link/components/GameInterface.jsx";
import RulesModal from "../border-link/components/RulesModal.jsx";

export default function BorderLink() {
    const location = useLocation();
    const [showRules, setShowRules] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    return(
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.backButton}>
                    ← Back to Games
                </Link>
            </header>

            {!gameStarted ? (
                <div className={styles.content}>
                    <div className={styles.gameMenu}>
                        <h2>Welcome to Border Link!</h2>
                        <p>Can you find the path between countries?</p>

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
};