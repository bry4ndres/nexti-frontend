import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../EventForm/EventForm';

const CreateEvent = () => {
    const navigate = useNavigate();

    const handleCloseForm = () => {
        navigate('/');
    };

    const handleSave = () => {
        navigate('/');
    };

    return (
        <EventForm onClose={handleCloseForm} onSave={handleSave} />
    );
}

export default CreateEvent;