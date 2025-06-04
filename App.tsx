import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import RouteScreen from './src/screens/RouteScreen';
import { WebSocketProvider } from './src/context/WebSocketContext';

export type RootStackParamList = {
  Home: undefined;
  Route: {
    origin: any;
    destination: any;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <WebSocketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'EV Charging Scheduler' }}
          />
          <Stack.Screen 
            name="Route" 
            component={RouteScreen} 
            options={{ title: 'Route & Charging Schedule' }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </WebSocketProvider>
  );
}
