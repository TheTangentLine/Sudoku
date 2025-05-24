import React from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import './BackButton.css';

const BackButton: React.FC = () => {
    return (
        <div className="back-button">
            <MdKeyboardBackspace />
        </div>
    );
};

export default BackButton;
