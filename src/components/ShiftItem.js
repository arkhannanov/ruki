import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const ShiftItem = ({ shift, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{shift.title || 'Смена'}</Text>
            <Text style={styles.info}>{shift.location}</Text>
            <Text style={styles.info}>{shift.date} • {shift.time}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    info: {
        fontSize: 14,
        color: '#555',
    },
});

export default ShiftItem;