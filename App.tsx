import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen, screens } from './src/screens';
import { NotificationProvider } from './src/providers/notification-provider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <NotificationProvider>
            <Stack.Navigator initialRouteName="home">
              {Object.entries(screens as Record<string, Screen>).map(([key, { component, title, options }]) => (
                <Stack.Screen
                  key={key}
                  name={key}
                  component={component}
                  options={{ ...options, title, }}
                />
              ))}
            </Stack.Navigator>
          </NotificationProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
