import React from "react";
import { Surface, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { QRParseError } from "../utils/qr-code";

interface Props {
  error: QRParseError;
}

export const QRErrorDisplay: React.FC<Props> = ({ error }) => {
  return (
    <Surface style={styles.surface}>
      {error === 'invalid-url' && (
        <Text>Invalid QR Code</Text>
      )}

      {error === 'wrong-url' && (
        <Text>QR code doesn't refer to a booking</Text>
      )}

      {error === 'invalid-setup' && (
        <Text>Invalid setup QR code</Text>
      )}

      {error === 'wrong-server' && (
        <Text>Booking was made on a different server</Text>
      )}

      {error === 'wrong-operator' && (
        <Text>Booking was made for a different operator</Text>
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