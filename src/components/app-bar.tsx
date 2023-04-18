import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export const AppBar: React.FC = () => {
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Content title="Charter" />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    backgroundColor: '#8fc9ff'
  }
})