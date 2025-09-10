import { makeAutoObservable } from 'mobx';
import { getShiftsByLocation } from '../services/api';
import { getCurrentLocation } from '../services/location';

class ShiftStore {
    shifts = [];
    loading = false;
    error = null;
    selectedShift = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (loading) => {
        this.loading = loading;
    };

    setError = (error) => {
        this.error = error;
    };

    setShifts = (shifts) => {
        this.shifts = shifts;
    };

    setSelectedShift = (shift) => {
        this.selectedShift = shift;
    };

    fetchShifts = async () => {
        this.setLoading(true);
        this.setError(null);
        try {
            const coords = await getCurrentLocation();
            const shifts = await getShiftsByLocation(coords.latitude, coords.longitude);
            this.setShifts(shifts);
        } catch (err) {
            this.setError(err.message || 'Ошибка загрузки');
        } finally {
            this.setLoading(false);
        }
    };
}

export default ShiftStore;