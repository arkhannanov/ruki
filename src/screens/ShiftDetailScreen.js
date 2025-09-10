import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { useStores } from '../store/useStores';

const ShiftDetailScreen = observer(() => {
    const { shiftStore } = useStores();
    const shift = shiftStore.selectedShift;

    if (!shift) {
        return (
            <View style={styles.container}>
                <Text>Смена не выбрана</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>{shift.title}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Дата:</Text> {shift.date}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Время:</Text> {shift.time}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Место:</Text> {shift.location}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Описание:</Text> {shift.description}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Оплата:</Text> {shift.payment} ₽</Text>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    detail: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 24,
    },
    label: {
        fontWeight: '600',
    },
});

export default ShiftDetailScreen;