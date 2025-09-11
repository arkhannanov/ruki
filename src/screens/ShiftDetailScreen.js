import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '../store/useStores';

const ShiftDetailScreen = observer(() => {

    const { shiftStore } = useStores();
    const shift = shiftStore.selectedShift;

    if (!shift) {
        console.log('>>> shift is null/undefined'); // ← И ЭТОТ
        return (
            <View style={styles.centered}>
                <Text>Смена не выбрана</Text>
            </View>
        );
    }

    const openMap = () => {
        const url = `https://yandex.ru/maps/?text=${encodeURIComponent(shift.address)}`;
        Linking.openURL(url).catch(() => alert('Не удалось открыть карты'));
    };

    const ratingStars = '⭐'.repeat(Math.round(shift.customerRating)) + '☆'.repeat(5 - Math.round(shift.customerRating));


    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {shift.logo ? (
                <Image source={{ uri: shift.logo }} style={styles.logo} resizeMode="contain" />
            ) : (
                <View style={styles.logoPlaceholder}>
                    <Text style={styles.logoText}>Нет лого</Text>
                </View>
            )}

            <Text style={styles.companyName}>{shift.companyName}</Text>
            <Text style={styles.workType}>
                {(() => {
                    const wt = shift.workTypes;
                    if (!wt) return 'Не указано';
                    if (typeof wt === 'string') return wt;
                    if (Array.isArray(wt)) return wt.map(t => t?.name).filter(Boolean).join(', ');
                    if (typeof wt === 'object') return wt.name || 'Неизвестно';
                    return String(wt);
                })()}
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📍 Адрес</Text>
                <Text style={styles.address} onPress={openMap}>
                    {shift.address}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📅 Дата и время</Text>
                <Text style={styles.datetime}>
                    {shift.dateStartByCity} с {shift.timeStartByCity} до {shift.timeEndByCity}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>💰 Оплата</Text>
                <Text style={styles.payment}>{shift.priceWorker} ₽ за смену</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>👥 Набор</Text>
                <Text style={styles.workers}>
                    Нужно: {shift.planWorkers} • Уже набрано: {shift.currentWorkers}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>⭐ Рейтинг нанимателя</Text>
                <Text style={styles.rating}>
                    {ratingStars} ({shift.customerRating}/5 на основе {shift.customerFeedbacksCount} отзывов)
                </Text>
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 12,
    },
    logoPlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#e9ecef',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    logoText: {
        color: '#6c757d',
        fontSize: 12,
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#212529',
    },
    workType: {
        fontSize: 16,
        textAlign: 'center',
        color: '#495057',
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
    },
    address: {
        fontSize: 15,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    datetime: {
        fontSize: 15,
        color: '#495057',
    },
    payment: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    workers: {
        fontSize: 15,
        color: '#6c757d',
    },
    rating: {
        fontSize: 16,
        color: '#ffc107',
        fontWeight: '500',
    },
});

export default ShiftDetailScreen;