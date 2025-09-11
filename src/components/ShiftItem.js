import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ShiftItem = ({ shift, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{shift.name}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>ID: {shift.id}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                <Text>nameGt5: {shift.nameGt5 ? '✅' : '❌'}</Text>
                <Text>nameLt5: {shift.nameLt5 ? '✅' : '❌'}</Text>
                <Text>nameOne: {shift.nameOne ? '✅' : '❌'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ShiftItem;