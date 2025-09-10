import axios from 'axios';

const API_BASE_URL = 'https://mobile.handswork.pro/api/shift';

export const getShiftsByLocation = async (lat, lng) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?lat=${lat}&lng=${lng}`);
        return response.data.shifts || []; // адаптируйте под реальный формат ответа
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Не удалось загрузить смены');
    }
};