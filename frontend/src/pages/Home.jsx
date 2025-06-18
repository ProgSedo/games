import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const games = [
  {
    id: 'word-game',
    title: 'Word Game',
    description: 'Test your vocabulary and quick thinking in this exciting word game!',
    image: '/game-thumbnails/word-game.png' // We'll add this image later
  },
  {
    id: 'scrambled-words',
    title: 'Scrambled Words',
    description: 'Unscramble letters to form words in this challenging word puzzle game!',
    image: '/game-thumbnails/scrambled-words.png' // We'll add this image later
  },
  {
    id: 'border-link',
    title: 'Border Link',
    description: 'Reach from a country to another by borders!',
    image: '/game-thumbnails/scrambled-words.png',
  }
  // More games can be added here in the future
];

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Game Collection</h1>
      <div className={styles.gamesGrid}>
        {games.map((game) => (
          <Link to={`/games/${game.id}`} key={game.id} className={styles.gameCard}>
            <div className={styles.gameImagePlaceholder}>
              {/* We'll replace this with actual images later */}
              <span>{game.title[0]}</span>
            </div>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 