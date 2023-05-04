import { type RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { BookingView } from "components/booking-view";
import { Wrapper } from "components/wrapper";
import { useSetBookingFulfillment } from "state/booking.state";
import { useNavigate } from "utils/nav";

export const BookingScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ detail: { bookingId: string } }, "detail">>();

  const bookingId = route.params.bookingId;

  const navigation = useNavigate();

  const [
    setBookingFulfillmentStatus,
    setBookingFulfillment,
    clearBookingFulfillment,
  ] = useSetBookingFulfillment((s) => [s.status, s.request, s.clear]);

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
                disabled={
                  setBookingFulfillmentStatus === "fetching" ||
                  setBookingFulfillmentStatus === "success"
                }
              >
                {!setBookingFulfillmentStatus && "Fulfill booking"}
                {setBookingFulfillmentStatus === "fetching" && (
                  <ActivityIndicator />
                )}
                {setBookingFulfillmentStatus === "error" &&
                  "There was an error"}
                {setBookingFulfillmentStatus === "success" && "✔"}
              </Button>
            )}
          </>
        )}
      </BookingView>

      <Button onPress={handleReset}>Scan another QR code</Button>
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
