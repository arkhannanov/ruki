import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'mobx-react';
import ShiftStore from './src/store/ShiftStore';

const shiftStore = new ShiftStore();

const App = () => {
  return (
      <Provider shiftStore={shiftStore}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
  );
};

export default App;