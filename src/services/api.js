import axios from 'axios';

const API_BASE_URL = 'https://mobile.handswork.pro/api/shifts/map-list-unauthorized';

export const getShiftsByLocation = async (lat, lng) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?latitude=${lat}&longitude=${lng}`);
        console.log(response)
        return response.data.data || [];
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Не удалось загрузить смены');
    }
};