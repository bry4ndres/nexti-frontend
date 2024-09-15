import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEvents, deleteEvent } from '../../services/eventService';
import { setEvents } from '../../features/eventsSlice';
import CreateEvent from '../CreateEvent/CreateEvent';
import AddButton from '../AddButton/AddButton';
import { toast } from 'react-toastify';
import './EventList.css';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events);
    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             const data = await getAllEvents();
    //             dispatch(setEvents(data));
    //         } catch (error) {
    //             console.error('Failed to fetch events:', error);
    //         }
    //     };
    //     fetchEvents();
    // }, [dispatch]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents(pageNumber, pageSize);
                dispatch(setEvents(data.items));
                setTotalPages(data.totalPages);
                setTotalEvents(data.totalCount);
            } catch (error) {
                toast.error('Error al cargar los eventos');
                console.error('Error al cargar los eventos:', error);
            }
        };
        fetchEvents();
    }, [dispatch, pageNumber, pageSize]);

    const detailsEvent = (id) => {
        navigate(`/event/${id}`);
    };

    const editEvent = (id) => {
        navigate(`/event/${id}/edit`);
    };
    
    const updateEventEstatus = async (id) => {
        try {
            await deleteEvent(id);
            const updatedEvents = events.filter(event => event.id !== id);
            dispatch(setEvents(updatedEvents));
            toast.success('Evento eliminado');  
        } catch (error) {
            toast.error('Error al actualizar evento');
            console.error('Error al actualizar evento:', error);
        }
    };

    const handleAddClick = () => {
        navigate('/create');
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    return (
        <div>
            <h2>Lista de Eventos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Fecha</th>
                        <th>Lugar</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.description}</td>
                            <td>{new Date(event.date).toLocaleString()}</td>
                            <td>{event.location}</td>
                            <td>{event.price}</td>
                            <td>
                                <button onClick={() => detailsEvent(event.id)}>Detalles</button>                           
                                <button onClick={() => editEvent(event.id)}>Editar</button>                           
                                <button onClick={() => updateEventEstatus(event.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >
                    Anterior
                </button>
                <span>Página {pageNumber} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                >
                    Siguiente
                </button>
                
            </div>
            <span>Total de eventos: {totalEvents}</span>
            <AddButton onClick={handleAddClick} />
        </div>
    );
}

export default EventList;