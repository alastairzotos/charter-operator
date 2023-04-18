import React from "react";
import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { QRParseError } from "../utils/qr-code";

interface Props {
  error: QRParseError;
}

export const ErrorDisplay: React.FC<Props> = ({ error }) => {
  return (
    <Surface style={styles.surface}>
      {error === 'invalid-url' && (
        <Text>Invalid QR Code</Text>
      )}

      {error === 'wrong-url' && (
        <Text>QR code doesn't refer to a booking</Text>
      )}
    </Surface>
  )
}

const styles = StyleSheet.create({
  surface: {
    padding: 12,
    position: 'absolute',
    alignSelf: 'center',
    top: 24
  }
})