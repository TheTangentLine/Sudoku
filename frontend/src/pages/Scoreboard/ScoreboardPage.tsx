import { Link, useLocation } from 'react-router-dom';
import { MdOutlineReplay } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import React from 'react';
import './ScoreboardPage.css';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const ScoreboardPage: React.FC = () => {
    const location = useLocation();
    const {
        time = null,
        isCorrect = false,
        board = [],
        solution = [],
        fixedCells = [],
        difficulty = 0,   // Add difficulty with default fallback
    } = location.state || {};


    return (
        <>
            <div className="result">
                <h1>Result</h1>
            </div>
            <div className="scoreboard-content">
                <div className="best-results">
                    <div className="row">
                        <div className="label-button current">Score</div>
                        <div className={`score-box ${isCorrect ? 'correct' : 'incorrect'}`} id="current-score">
                            {isCorrect ? (time !== null ? formatTime(time) : '-') : 'Incorrect'}
                        </div>
                    </div>
                </div>
            </div>
            <div className="controls">
                {/* Replay button navigates back to /play passing difficulty */}
                <Link to="/play" className="control_button" state={{ difficulty }}>
                    <MdOutlineReplay />
                </Link>
                {/* Home button */}
                <Link to="/" className="control_button">
                    <GoHomeFill />
                </Link>

                {/* Check button */}
                <Link to='/check' className="control_button" state={{ board, solution, fixedCells }}>
                    <FaCheck />
                </Link >
            </div >
        </>
    );
};

export default ScoreboardPage;
