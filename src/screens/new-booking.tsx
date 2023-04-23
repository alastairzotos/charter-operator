import { type RouteProp, useRoute } from "@react-navigation/native";
import React from "react";

import { BookingView } from "components/booking-view";
import { Wrapper } from "components/wrapper";
import { Text } from "react-native-paper";
import { BookingResponseButtons } from "components/booking-response-buttons";

export const NewBookingScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ detail: { bookingId: string } }, "detail">>();

  const bookingId = route.params.bookingId;

  return (
    <Wrapper>
      <BookingView bookingId={bookingId}>
        {(booking) => (
          <>
            {booking.status === 'pending' && <BookingResponseButtons bookingId={bookingId} />}
            {booking.status === 'rejected' && <Text>You have rejected this booking</Text>}
            {booking.status === 'confirmed' && <Text>This booking is confirmed</Text>}
          </>
        )}
      </BookingView>
    </Wrapper>
  );
};
