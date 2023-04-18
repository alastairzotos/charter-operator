import React, { useState } from 'react';
import { DataView } from './src/components/data-view';
import { ErrorDisplay } from './src/components/error-display';
import { QRCodeScanner } from './src/components/qr-code-scanner';
import { Wrapper } from './src/components/wrapper';
import { extractBookingFromQrCode, QRParseError } from './src/utils/qr-code';

export default function App() {
  const [error, setError] = useState<QRParseError | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleDataReceived = (_: string, data: string) => {
    const { error, result } = extractBookingFromQrCode(data);

    if (!!error) {
      setError(error);
    } else {
      setError(null);
      setBookingId(result.bookingId);
    }
  }

  return (
    <Wrapper>
      {!!bookingId && (
        <DataView bookingId={bookingId} onReset={() => setBookingId(null)} />
      )}

      {!bookingId && (
        <QRCodeScanner
          onDataReceived={handleDataReceived}
          prompt="Point the camera at a QR code to verify the booking"
        >
          {error && <ErrorDisplay error={error} />}
        </QRCodeScanner>
      )}

    </Wrapper>
  );
}
