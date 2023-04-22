import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { Screen, screens } from './src/screens';
import { NotificationProvider } from './src/providers/notification-provider';
import { useAuthState } from './src/state/auth.state';
import { Wrapper } from 'components/wrapper';

const Stack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const { initialised, setup } = useAuthState();

  useEffect(() => {
    if (!initialised) {
      setup();
    }
  }, [initialised]);

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
                  options={{ title, ...options, }}
                />
              ))}
            </Stack.Navigator>
          </NotificationProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
