import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import ShiftStore from './src/store/ShiftStore';
import { StoresProvider } from './src/store/useStores';
import {View} from "react-native";

const shiftStore = new ShiftStore();

const App = () => {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StoresProvider shiftStore={shiftStore}>
                    <NavigationContainer>
                        <SafeAreaView style={{ flex: 1 }}>
                            <AppNavigator />
                        </SafeAreaView>
                    </NavigationContainer>
                </StoresProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default App;