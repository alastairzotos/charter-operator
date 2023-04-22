import React, { useEffect, useState } from "react";
import { QRErrorDisplay } from "../components/qr-error-display";
import { QRCodeScanner } from "../components/qr-code-scanner";
import { useNavigate } from "../utils/nav";
import { extractSetupDataFromQrCode, QRParseError } from "../utils/qr-code";
import { clearSetup, saveSetup } from "../state/setup.state";
import { useAuthState } from "../state/auth.state";

export const SetupScanner: React.FC = () => {
  const navigation = useNavigate();

  const [error, setError] = useState<QRParseError | null>(null);
  const { logout } = useAuthState();

  useEffect(() => {
    clearSetup();
    logout();
  }, []);

  const handleDataReceived = async (_: string, data: string) => {
    const { error, result } = extractSetupDataFromQrCode(data);

    if (!!error) {
      setError(error);
    } else {
      setError(null);
      await saveSetup(result);
      navigation.push('login', { server: result.server });
    }
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
