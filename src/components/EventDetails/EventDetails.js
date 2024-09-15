import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventService';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event:', error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Detalles del Evento</h2>
            <p><strong>Descripción:</strong> {event.description}</p>
            <p><strong>Fecha:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Lugar:</strong> {event.location}</p>
            <p><strong>Precio:</strong> {event.price}</p>
        </div>
    );
};

export default EventDetails;