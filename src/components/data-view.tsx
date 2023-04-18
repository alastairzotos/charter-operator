import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { useGetBooking } from "../state/booking.state";
import { BookingDataTable } from "./data-table";

export interface Props {
  bookingId: string;
  onReset: () => void;
}

export const DataView: React.FC<Props> = ({ bookingId, onReset }) => {
  const [getBookingStatus, getBooking, booking] = useGetBooking(s => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!bookingId) {
      getBooking(bookingId);
    }
  }, [bookingId]);

  return (
    <>
      <View>
        {getBookingStatus === 'fetching' && (
          <ActivityIndicator size="large" />
        )}

        {getBookingStatus === 'error' && (
          <Text>There was an error. Please try again</Text>
        )}

        {(getBookingStatus === 'success' && !!booking) && (
          <>
            <Text>Booking: <Text style={{ fontWeight: 'bold' }}>{bookingId}</Text></Text>
            <BookingDataTable data={booking} />
          </>
        )}
      </View>

      {(getBookingStatus === 'error' || getBookingStatus === 'success') && (
          <Button
            onPress={onReset}
            mode="contained"
            style={styles.scanButton}
          >
            Scan another QR code
          </Button>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  scanButton: {
    padding: 16,
    borderRadius: 1000,
    marginTop: 40,
  }
})
