import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export const WRAPPER_PADDING = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: WRAPPER_PADDING,
    paddingTop: 0,
  },
});
