import { type RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";

import { BookingView } from "components/booking-view";
import { Wrapper } from "components/wrapper";
import { useNavigate } from "utils/nav";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useSetBookingFulfillment } from "state/booking.state";

export const BookingScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ detail: { bookingId: string } }, "detail">>();
  
  const bookingId = route.params.bookingId;

  const navigation = useNavigate();

  const [setBookingFulfillmentStatus, setBookingFulfillment, clearBookingFulfillment] = useSetBookingFulfillment(
    (s) => [s.status, s.request, s.clear]
  )

  useEffect(() => {
    clearBookingFulfillment();
  }, [bookingId]);

  const handleReset = () => navigation.push("home");

  return (
    <Wrapper>
      <BookingView bookingId={bookingId}>
        {(booking) => (
          <>
            {!booking.fulfilled && (
              <Button
                mode="contained"
                style={styles.fulfillButton}
                onPress={() => setBookingFulfillment(bookingId, true)}
                disabled={setBookingFulfillmentStatus === 'fetching' || setBookingFulfillmentStatus === 'success'}
              >
                {!setBookingFulfillmentStatus && "Fulfill booking"}
                {setBookingFulfillmentStatus === 'fetching' && <ActivityIndicator />}
                {setBookingFulfillmentStatus === 'error' && "There was an error"}
                {setBookingFulfillmentStatus === 'success' && "✔"}
              </Button>
            )}
          </>
        )}
      </BookingView>

      <Button onPress={handleReset}>
        Scan another QR code
      </Button>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  fulfillButton: {
    padding: 16,
    borderRadius: 1000,
    marginBottom: 16,
  },
});
