import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';
import homeIcon from '../HomeButton/home-icon.svg';

const HomeButton = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <button className="floating-button" onClick={goToHome}>
            <img src={homeIcon} alt="Home" className="home-icon" />
        </button>
    );
};

export default HomeButton;