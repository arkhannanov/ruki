import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';
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

    if (shiftStore.loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (shiftStore.error) {
        Alert.alert('Ошибка', shiftStore.error);
    }

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