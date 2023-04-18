import React, { useState } from "react";
import { QRErrorDisplay } from "../components/qr-error-display";
import { QRCodeScanner } from "../components/qr-code-scanner";
import { useNavigate } from "../utils/nav";
import { extractSetupDataFromQrCode, QRParseError } from "../utils/qr-code";
import { setStorageItem, storageKeys } from "../storage";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const SetupScanner: React.FC = () => {
  const navigation = useNavigate();

  const [error, setError] = useState<QRParseError | null>(null);
  const [server, setServer] = useState<string | undefined>();

  const handleDataReceived = async (_: string, data: string) => {
    const { error, result } = extractSetupDataFromQrCode(data);

    if (!!error) {
      setError(error);
    } else {
      setError(null);
      await setStorageItem(storageKeys.server, result.server);
      setServer(result.server);
    }
  }

  if (!!server) {
    return (
      <>
        <Text>You have connected to <Text style={styles.serverName}>{server}</Text></Text>

        <Button
          style={styles.homeButton}
          mode="contained"
          onPress={() => navigation.push("home")}
        >
          Click to return home
        </Button>
      </>
    )
  }

  return (
    <QRCodeScanner
      onDataReceived={handleDataReceived}
      prompt="To get started, scan the QR code in your confirmation email"
    >
      {error && <QRErrorDisplay error={error} />}
    </QRCodeScanner>
  );
}

const styles = StyleSheet.create({
  serverName: {
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 20,
  }
})