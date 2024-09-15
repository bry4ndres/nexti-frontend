import React from 'react';
import './AddButton.css';
import plusIcon from './plus-icon.svg';

const AddButton = ({ onClick }) => {
    return (
        <button className="floating-add-button" onClick={onClick}>
             <img src={plusIcon} alt="Home" className="home-icon" />
        </button>
    );
};

export default AddButton;