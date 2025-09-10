import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShiftListScreen from '../screens/ShiftListScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ShiftList">
            <Stack.Screen name="ShiftList" component={ShiftListScreen} options={{ title: 'Доступные смены' }} />
            <Stack.Screen name="ShiftDetail" component={ShiftDetailScreen} options={{ title: 'Детали смены' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;