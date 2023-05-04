import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

import { DataErrorDisplay } from "components/data-error-display";
import { BookingDataTable } from "components/data-table";
import { ReadableBooking } from "models/bookings";
import { useGetBooking } from "state/booking.state";

export interface Props {
  bookingId: string;
  children?: (booking: ReadableBooking) => React.ReactNode;
}

export const BookingView: React.FC<Props> = ({ bookingId, children }) => {
  const [getBookingStatus, getBooking, booking] = useGetBooking((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (bookingId) {
      getBooking(bookingId);
    }
  }, [bookingId]);

  return (
    <>
      {getBookingStatus === "success" && !!booking && (
        <DataErrorDisplay booking={booking} />
      )}

      <ScrollView>
        {getBookingStatus === "fetching" && <ActivityIndicator size="large" />}

        {getBookingStatus === "error" && (
          <Text>There was an error. Please try again</Text>
        )}

        {getBookingStatus === "success" && !!booking && (
          <BookingDataTable
            data={{
              Service: booking.service.name,
              ...booking.data,
            }}
          />
        )}
      </ScrollView>

      {booking && children && children(booking)}
    </>
  );
};
