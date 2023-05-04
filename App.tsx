import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { Screen, screens } from './src/screens';
import { NotificationProvider } from './src/providers/notification-provider';
import { useAuthState } from './src/state/auth.state';
import { useGetConfiguration } from 'state/configuration.state';
import { ConfigurationProvider } from 'hooks/configuration.hook';
import { StatusSwitch } from 'components/status-switch';
import { useRefreshToken } from 'state/login.state';

const Stack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const { initialised, setup, loggedInUser } = useAuthState();
  const [getConfigurationStatus, getConfiguration, configuration] = useGetConfiguration(s => [s.status, s.request, s.value]);
  const [refreshToken] = useRefreshToken(s => [s.request]);

  useEffect(() => {
    console.log({ initialised })
    if (!initialised) {
      setup();
    } else {
      if (!!loggedInUser) {
        refreshToken();
      }
    }
  }, [initialised]);

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider>
          <NotificationProvider>
            <StatusSwitch
              status={getConfigurationStatus}
              error={<Text>There was an error getting the configuration</Text>}
            >
              <ConfigurationProvider value={configuration!}>
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
              </ConfigurationProvider>
            </StatusSwitch>
          </NotificationProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
