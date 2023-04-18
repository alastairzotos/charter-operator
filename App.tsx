import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { screens } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <Stack.Navigator initialRouteName="home">
            {Object.entries(screens).map(([key, { component, title }]) => (
              <Stack.Screen
                key={key}
                name={key}
                component={component}
                options={{ title }}
              />
            ))}
          </Stack.Navigator>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
