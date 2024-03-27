import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserDataScreen from './screens/UserData';
import DisplayDataScreen from './screens/DataDisplay';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserData">
        <Stack.Screen name="UserData" component={UserDataScreen} />
        <Stack.Screen name="DisplayData" component={DisplayDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
