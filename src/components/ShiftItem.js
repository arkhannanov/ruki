import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ShiftItem = ({ shift, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{shift.name}</Text>
            <Text>ID: {shift.id}</Text>
        </TouchableOpacity>
    );
};
export default ShiftItem;