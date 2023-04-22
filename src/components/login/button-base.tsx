import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  prompt: string;
  disabled?: boolean;
  onPress: () => void;
}

export const LoginButton: React.FC<Props> = ({ prompt, disabled, onPress }) => {
  return (
    <Button
      mode="contained"
      style={styles.button}
      disabled={disabled}
      onPress={onPress}
    >
      {prompt}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
