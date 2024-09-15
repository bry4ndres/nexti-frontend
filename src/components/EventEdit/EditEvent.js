import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../EventForm/EventForm'; 
import './EditEvent.css';


const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleCloseForm = () => {
        navigate(`/event/${id}`);
    };

    const handleSave = () => {
        navigate(`/event/${id}`);
    };

    return (
        <EventForm eventId={id} onClose={handleCloseForm} onSave={handleSave} />
    );
};

export default EditEvent;