import React, { useState } from "react";
import { QRErrorDisplay } from "../components/qr-error-display";
import { QRCodeScanner } from "../components/qr-code-scanner";
import { useNavigate } from "../utils/nav";
import { extractBookingFromQrCode, QRParseError } from "../utils/qr-code";
import { useSetup } from "../state/setup.state";

export const BookingScanner: React.FC = () => {
  const navigation = useNavigate();

  const { setup } = useSetup();

  const [error, setError] = useState<QRParseError | null>(null);

  const handleDataReceived = (_: string, data: string) => {
    const { error, result } = extractBookingFromQrCode(data);

    if (!!error) {
      setError(error);
    } else if (result.hostData.server !== setup.server) {
      setError('wrong-server');
    } else {
      setError(null);
      navigation.push("booking", { bookingId: result.bookingId });
    }
  }

  return (
    <QRCodeScanner
      onDataReceived={handleDataReceived}
      prompt="Point the camera at a QR code to verify the booking"
    >
      {error && <QRErrorDisplay error={error} />}
    </QRCodeScanner>
  );
}
