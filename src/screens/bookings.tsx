import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import { Wrapper } from "components/wrapper";
import { useGetBookings } from "state/booking.state";
import { useSetup } from "state/setup.state";
import { BookingList } from "screens/booking-list";

export const BookingsScreen: React.FC = () => {
  const [tab, setTab] = useState('pending');

  const { getSetupStatus, setup } = useSetup();
  const [getBookingsStatus, getBookings, bookings] = useGetBookings((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (setup) {
      getBookings(setup.operator.id);
    }
  }, [setup]);

  const pendingBookings = bookings
    ? bookings.filter((booking) => booking.status === "pending")
    : undefined;

  const confirmedBookings = bookings
    ? bookings.filter((booking) => booking.status === "confirmed")
    : undefined;

  const rejectedBookings = bookings
    ? bookings.filter((booking) => booking.status === "rejected")
    : undefined;

  return (
    <Wrapper>
      {(getSetupStatus === "error" || getBookingsStatus === "error") && (
        <Text>There was an error getting the bookings</Text>
      )}

      {bookings && (
        <>
          <SegmentedButtons
            style={styles.buttons}
            value={tab}
            onValueChange={setTab}
            buttons={[
              {
                label: 'Pending',
                value: 'pending',
              },
              {
                label: 'Confirmed',
                value: 'confirmed',
              },
              {
                label: 'Rejected',
                value: 'rejected'
              }
            ]}
          />

          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={getBookingsStatus === 'fetching'}
                onRefresh={() => getBookings(setup.operator.id)}
              />
            }
          >
            {tab === 'pending' && <BookingList bookings={pendingBookings} />}
            {tab === 'confirmed' && <BookingList bookings={confirmedBookings} />}
            {tab === 'rejected' && <BookingList bookings={rejectedBookings} />}
          </ScrollView>
        </>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 10,
  },
  scrollView: {
    padding: 0,
    margin: 0,
  }
})