import React from "react";
import { StyleSheet, View } from "react-native";

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export const WRAPPER_PADDING = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: WRAPPER_PADDING,
  },
});
