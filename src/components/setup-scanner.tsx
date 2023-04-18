import React, { useState } from "react";
import { QRErrorDisplay } from "../components/qr-error-display";
import { QRCodeScanner } from "../components/qr-code-scanner";
import { useNavigate } from "../utils/nav";
import { extractSetupDataFromQrCode, QRParseError } from "../utils/qr-code";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { saveSetup, useSetup } from "../state/setup.state";

export const SetupScanner: React.FC = () => {
  const navigation = useNavigate();

  const { setup } = useSetup();

  const [error, setError] = useState<QRParseError | null>(null);
  const [connectToAnotherAccount, setConnectToAnotherAccount] = useState(false);

  const handleDataReceived = async (_: string, data: string) => {
    const { error, result } = extractSetupDataFromQrCode(data);

    if (!!error) {
      setError(error);
    } else {
      setError(null);
      await saveSetup(result);
      setConnectToAnotherAccount(false);
    }
  }

  if (!!setup && !connectToAnotherAccount) {
    return (
      <>
        <Text>
          Connected to <Text style={styles.bold}>{setup.server}</Text> as <Text style={styles.bold}>{setup.operator.name}</Text>
        </Text>

        <Button
          style={styles.homeButton}
          mode="contained"
          onPress={() => navigation.push("home")}
        >
          Click to return home
        </Button>

        <Button
          style={styles.connectToAnotherButton}
          onPress={() => setConnectToAnotherAccount(true)}
        >
          Connect to another account
        </Button>
      </>
    )
  }

  return (
    <>
      <QRCodeScanner
        onDataReceived={handleDataReceived}
        prompt="To get started, scan the QR code in your confirmation email"
      >
        {error && <QRErrorDisplay error={error} />}
      </QRCodeScanner>

      {connectToAnotherAccount && (
        <Button
          style={styles.cancelButton}
          mode="contained-tonal"
          onPress={() => setConnectToAnotherAccount(false)}
        >
          Cancel
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 20,
  },
  connectToAnotherButton: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 20,
  }
})