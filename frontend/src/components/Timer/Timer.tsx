import React from 'react';
import { MdTimer } from "react-icons/md";
import './Timer.css';

interface TimerProps {
    time: number; // Time passed in seconds
}

const Timer: React.FC<TimerProps> = ({ time }) => {
    // Convert time (in seconds) into hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <div className="timer" >
            <MdTimer className="timer-icon" />
            <span>
                {String(hours).padStart(2, '0')}
                :{String(minutes).padStart(2, '0')}
                :{String(seconds).padStart(2, '0')}
            </span>
        </div>
    );
};

export default Timer;