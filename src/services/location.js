// src/services/location.js
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Linking, Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return result === RESULTS.GRANTED;
    } else if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Доступ к местоположению',
                message: 'Приложению нужен доступ к вашему местоположению, чтобы найти смены рядом с вами.',
                buttonNeutral: 'Спросить позже',
                buttonNegative: 'Отмена',
                buttonPositive: 'Разрешить',
            }
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            // Показываем алерт с предложением открыть настройки
            Alert.alert(
                'Разрешение отклонено',
                'Без доступа к местоположению приложение не сможет найти смены рядом с вами. Хотите открыть настройки?',
                [
                    { text: 'Нет', style: 'cancel' },
                    {
                        text: 'Да',
                        onPress: () => openSettings().catch(() => console.warn('Не удалось открыть настройки')),
                        style: 'default',
                    },
                ],
                { cancelable: false }
            );
            return false;
        }
    }
    return false;
};

export const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
        throw new Error('location permission not granted');
    }

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    });
};