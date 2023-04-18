import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-paper';
import { useGetBooking } from "../state/booking.state";
import { useNavigate } from "../utils/nav";
import { DataErrorDisplay } from "./data-error-display";
import { BookingDataTable } from "./data-table";

export interface Props {
  bookingId: string;
  onReset: () => void;
}

export const DataView: React.FC<Props> = ({ bookingId, onReset }) => {
  const navigation = useNavigate();
  const [getBookingStatus, getBooking, booking] = useGetBooking(s => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!bookingId) {
      getBooking(bookingId);
    }
  }, [bookingId]);

  useEffect(() => {
    if (!!booking) {
      if (!!booking['Name']) {
        navigation.get().setOptions({ title: `Booking by ${booking['Name']}` });
      }
    }
  }, [booking]);

  return (
    <>
      {(getBookingStatus === 'success' && !!booking) && (
        <DataErrorDisplay data={booking} />
      )}

      <ScrollView>
        {getBookingStatus === 'fetching' && (
          <ActivityIndicator size="large" />
        )}

        {getBookingStatus === 'error' && (
          <Text>There was an error. Please try again</Text>
        )}

        {(getBookingStatus === 'success' && !!booking) && (
          <BookingDataTable data={booking} />
        )}
      </ScrollView>

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
  }
})
