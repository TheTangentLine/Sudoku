import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import './Check.css';

const Check: React.FC = () => {
    const location = useLocation();
    const { board, solution, fixedCells } = location.state || {};

    // Safe defaults to empty arrays if not provided or invalid
    const safeBoard = Array.isArray(board) ? board : [];
    const safeSolution = Array.isArray(solution) ? solution : [];
    const safeFixedCells = Array.isArray(fixedCells) ? fixedCells : [];

    // Early return if no valid data to display
    if (safeBoard.length === 0 || safeSolution.length === 0) {
        return (
            <>
                <Link to="/scoreboard" state={{ board: safeBoard }}>
                    <BackButton />
                </Link>
                <div>No board or solution data found.</div>
            </>
        );
    }

    return (
        <>
            <Link to="/scoreboard" state={{ board: safeBoard, solution: safeSolution, fixedCells: safeFixedCells }}>
                <BackButton />
            </Link>
            <div className="check-content">
                <table className="sudoku-board">
                    <tbody>
                        {safeBoard.map((row: number[], rowIndex: number) => (
                            <tr key={rowIndex}>
                                {row.map((cell: number, colIndex: number) => {
                                    const correctValue = safeSolution[rowIndex][colIndex];
                                    const isCorrect = cell === correctValue;
                                    const isFixed = safeFixedCells?.[rowIndex]?.[colIndex] ?? false;

                                    return (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={cell || ''}
                                                readOnly
                                                className={
                                                    (!isFixed ? 'fixed-cell ' : '') +
                                                    (isCorrect ? 'correct-cell' : 'incorrect-cell')
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Check;
