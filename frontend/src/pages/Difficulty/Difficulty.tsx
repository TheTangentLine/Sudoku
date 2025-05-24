import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import './Difficulty.css';


/**
 * Difficulty component allows the user to select a difficulty level for the game.
 * It provides three buttons: Easy, Medium, and Hard.
 * Upon clicking a button, it navigates to the Play page with the selected difficulty level.
 */

const Difficulty: React.FC = () => {

    // Navigation ---------------------------------------------------------------------------
    const navigate = useNavigate();
    const dataToSend = { difficulty: 0 }; // Data to send 

    // Function to handle difficulty --------------------------------------------------------
    const goToPlay = (difficult: number) => {
        dataToSend.difficulty = difficult;
        navigate('/play', { state: dataToSend }); // Navigate with state
    };

    // Render the component -----------------------------------------------------------------
    return (
        <>
            {/* Display the back button */}
            <Link to="/">
                <BackButton />
            </Link>

            {/* Display the title */}
            <div className="title choose-difficulty">
                <h1>Choose Difficulty</h1>
            </div>

            {/* Display the difficulty buttons */}
            <div className="difficulty">
                <button className="difficult easy" onClick={() => goToPlay(0)}>Easy</button>
                <button className="difficult medium" onClick={() => goToPlay(1)}>Medium</button>
                <button className="difficult hard" onClick={() => goToPlay(2)}>Hard</button>
            </div>

        </>
    );
};

export default Difficulty;
