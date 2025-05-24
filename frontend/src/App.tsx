import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import Home from './pages/Home/Home';
import PlayPage from './pages/Play/PlayPage';
import ScoreboardPage from './pages/Scoreboard/ScoreboardPage';
import Difficulty from './pages/Difficulty/Difficulty';
import Check from './pages/Check/Check';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  );
}

export default App;
