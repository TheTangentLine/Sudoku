import React, { useState, useEffect, useRef } from 'react';
import Timer from '../../components/Timer/Timer';
import BackButton from '../../components/BackButton/BackButton';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscDebugContinue } from "react-icons/vsc";
import { IoPauseSharp } from "react-icons/io5";
import axios from 'axios';
import './PlayPage.css';

const PlayPage: React.FC = () => {

    // Time management
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Board management
    const [board, setBoard] = useState<number[][]>([]);
    const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
    const [solution, setSolution] = useState<number[][]>([]); // Store the solution

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    // Get difficulty from previous page (fallback 0 if none)
    const difficulty = (location.state as { difficulty?: number })?.difficulty ?? 0;

    // Fetch board based on difficulty
    useEffect(() => {
        const fetchBoard = () => {
            axios.get(`http://localhost:8080/api/generate-board?difficulty=${difficulty}`)
                .then(response => {
                    setBoard(response.data.board);
                    setFixedCells(response.data.fixedCells);
                    setSolution(response.data.solution);
                })
                .catch(error => {
                    console.error('Error fetching the board:', error);
                });
        };

        fetchBoard();
    }, [difficulty]);

    // Timer logic
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused]);

    // Handle input changes on the board
    const handleCellChange = (row: number, col: number, value: number) => {
        const newBoard = board.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? value : cell))
        );
        setBoard(newBoard);
    };

    const handleCellInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowIndex: number,
        colIndex: number
    ) => {
        const value = e.target.value;

        // If the input is empty, clear the cell
        if (value === '') {
            if (fixedCells[rowIndex][colIndex] === true) {
                handleCellChange(rowIndex, colIndex, 0); // Set to 0 or null, depending on your logic
            }
        } else if (/^[1-9]$/.test(value)) { // Only accept a single character between 1 and 9
            if (fixedCells[rowIndex][colIndex] === true) {
                handleCellChange(rowIndex, colIndex, parseInt(value));
            }
        }
    };

    // Pause/Continue button toggle
    const handlePauseContinue = () => {
        setIsPaused(prev => !prev);
    };

    // Submit board for validation
    const handleSubmit = () => {
        axios.post('http://localhost:8080/api/validate-board', {
            board: board,
        })
            .then(response => {
                const isCorrect = response.data;
                navigate('/scoreboard', {
                    state: {
                        time,
                        isCorrect,
                        board,
                        solution,
                        fixedCells,
                    }
                });
            })
            .catch(error => {
                console.error('Error validating the board:', error);
            });
    };

    return (
        <div className={`game-container ${isPaused ? 'paused' : ''}`}>
            <div className="left-panel">
                <Link to="/difficulty">
                    <BackButton />
                </Link>
                <div className="time-container">
                    <Timer time={time} />
                </div>
                <div className="Reload-container">
                    <button className="reload" onClick={handlePauseContinue}>
                        {isPaused ? <VscDebugContinue /> : <IoPauseSharp />}
                    </button>
                </div>
                <div className='submit-container'>
                    <button className="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="right-panel">
                <div className="board-container">
                    <table className="sudoku-board">
                        <tbody>
                            {board.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={cell || ''}
                                                onChange={(e) => handleCellInputChange(e, rowIndex, colIndex)}
                                                disabled={fixedCells[rowIndex][colIndex] === false} // Disable only if the cell is non-fixed
                                                className={fixedCells[rowIndex][colIndex] === false ? 'fixed-cell' : ''} // Apply class to fixed cells
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlayPage;
