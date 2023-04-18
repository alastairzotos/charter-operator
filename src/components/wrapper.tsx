import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppBar } from "./app-bar";

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <AppBar />

          <View style={styles.inner}>
            {children}
          </View>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export const WRAPPER_PADDING = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: WRAPPER_PADDING,
  }
});
