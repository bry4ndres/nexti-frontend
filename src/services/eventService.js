import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEventById = async (id) => {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
}

// export const getAllEvents = async () => {
//     const response = await axios.get(`${API_URL}/Events/GetAll`);	
//     console.log(response.data);
//     return response.data;
// };

export const getAllEvents = async (pageNumber = 1, pageSize = 5) => {
    const response = await axios.get(`${API_URL}/Events/GetAll`, {
        params: {
            pageNumber,
            pageSize
        }
    });
    console.log(response.data);
    return response.data;
};

export const addEvent = async (event) => {
    const response = await axios.post(`${API_URL}/events`, event);
    return response.data;
};

export const updateEvent = async (event) => {
    const response = await axios.put(`${API_URL}/events`, event);
    return response.data;
}

export const deleteEvent = async (id) => {
    const response = await axios.delete(`${API_URL}/events/${id}`);
    if (response.status !== 200) {
        throw new Error('Failed to delete event');
    }

    return response.data;
}