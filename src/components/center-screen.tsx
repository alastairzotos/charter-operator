import React from "react";
import { StyleSheet, View } from "react-native";

export const CenterScreen: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
