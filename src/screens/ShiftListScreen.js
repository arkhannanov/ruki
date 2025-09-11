import React, { useEffect } from 'react';
import {View, FlatList, ActivityIndicator, Text, Alert, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../store/useStores';
import ShiftItem from '../components/ShiftItem';

const ShiftListScreen = observer(() => {
    const { shiftStore } = useStores();
    const navigation = useNavigation();

    useEffect(() => {
        shiftStore.fetchShifts();
    }, []);

    if (shiftStore.error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 16, color: '#d9534f', textAlign: 'center', marginBottom: 16 }}>
                    {shiftStore.error}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#0275d8',
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                    }}
                    onPress={() => shiftStore.fetchShifts()}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>Повторить</Text>
                </TouchableOpacity>
            </View>
        );
    }

    console.log('dddd', shiftStore.shifts)

    const handleShiftPress = (shift) => {
        shiftStore.setSelectedShift(shift);
        navigation.navigate('ShiftDetail');
    };



    return (
        <FlatList
            data={shiftStore.shifts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ShiftItem shift={item} onPress={() => handleShiftPress(item)} />
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    );
});

export default ShiftListScreen;

