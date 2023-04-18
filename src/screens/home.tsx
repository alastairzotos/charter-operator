import React, { useState } from "react";
import { QRErrorDisplay } from "../components/qr-error-display";
import { QRCodeScanner } from "../components/qr-code-scanner";
import { Wrapper } from "../components/wrapper";
import { useNavigate } from "../utils/nav";
import { extractBookingFromQrCode, QRParseError } from "../utils/qr-code";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigate();

  const [error, setError] = useState<QRParseError | null>(null);

  const handleDataReceived = (_: string, data: string) => {
    const { error, result } = extractBookingFromQrCode(data);

    if (!!error) {
      setError(error);
    } else {
      setError(null);
      navigation.push("booking", { bookingId: result.bookingId });
    }
  }

  return (
    <Wrapper>
      <QRCodeScanner
        onDataReceived={handleDataReceived}
        prompt="Point the camera at a QR code to verify the booking"
      >
        {error && <QRErrorDisplay error={error} />}
      </QRCodeScanner>
    </Wrapper>
  );
}
