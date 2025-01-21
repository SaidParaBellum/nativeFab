import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux'; 

import Home from './pages/Home';
import Exercise from './pages/Exercise';
import TrainingRequest from './pages/TrainingRequest';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginComponent}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Exercises"
          component={Exercise}
          options={{ title: 'Exercises' }}
        />
        <Stack.Screen
          name="TrainingRequest"
          component={TrainingRequest}
          options={{ title: 'Training Request' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterComponent}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
