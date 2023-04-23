import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

import { DataErrorDisplay } from "components/data-error-display";
import { BookingDataTable } from "components/data-table";
import { useGetBooking } from "state/booking.state";
import { useNavigate } from "utils/nav";
import { ReadableBooking } from "models/bookings";

export interface Props {
  bookingId: string;
  children?: (booking: ReadableBooking) => React.ReactNode;
}

export const BookingView: React.FC<Props> = ({ bookingId, children }) => {
  const navigation = useNavigate();
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
        <DataErrorDisplay data={booking.data} />
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
              ...booking.data
            }}
          />
        )}
      </ScrollView>

      {(booking && children) && children(booking)}
    </>
  );
};
