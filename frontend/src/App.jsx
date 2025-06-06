import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WordGame from './games/word-game/WordGame';
import ScrambledWords from './games/scrambled-words/ScrambledWords';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/word-game" element={<WordGame />} />
        <Route path="/games/scrambled-words" element={<ScrambledWords />} />
      </Routes>
    </Router>
  );
}

export default App;
