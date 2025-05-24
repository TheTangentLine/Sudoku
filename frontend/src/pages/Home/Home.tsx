import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {

    return (
        <>
            <div className="container">
                <div className="title">
                    <h1>Sudoku</h1>
                    <h3>by theTangentLine</h3>
                </div>

                <Link to="/difficulty" className="playButton">
                    Play
                </Link>

            </div>
        </>
    );
};

export default Home;
