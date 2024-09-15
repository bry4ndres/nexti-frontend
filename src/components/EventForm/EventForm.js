import React, { useState, useEffect } from 'react';
import { addEvent, updateEvent, getEventById } from '../../services/eventService';
import { toast } from 'react-toastify';
import './EventForm.css';

const EventForm = ({ eventId, onSave }) => {

    const [event, setEvent] = useState({
        description: '',
        date: '',
        location: '',
        price: ''
    });

    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const data = await getEventById(eventId);
                    setEvent(data);
                } catch (error) {
                    toast.error('Error al obtener el evento');
                    console.error('Error al obtener el evento:', error);
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const normalizedValue = value.replace(',', '.');
            const regex = /^\d+(\.\d{0,2})?$/;
            if (!regex.test(normalizedValue) && normalizedValue !== '') {
                toast.error('Por favor, ingrese un valor válido de dinero (por ejemplo, 10.99 o 10,99)');
                return;
            }

            setEvent((prevEvent) => ({
                ...prevEvent,
                [name]: normalizedValue
            }));

        } else {
            setEvent((prevEvent) => ({
                ...prevEvent,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eventId) {
                await updateEvent(event);
                toast.success('Evento actualizado');
            } else {
                await addEvent(event);
                toast.success('Evento creado');
            }
            onSave();
        } catch (error) {
            toast.error('Error al guardar evento, Revisa los campos');
            console.error('Failed to save event:', error);
        }
    };

    return (
        <div className="event-form-container">
            <form className="event-form" onSubmit={handleSubmit}>
                <h2>{eventId ? 'Editar Evento' : 'Crear Evento'}</h2>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="price"
                        name="price"
                        value={event.price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{eventId ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
}

export default EventForm;