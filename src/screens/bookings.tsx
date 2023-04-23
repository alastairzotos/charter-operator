import React, { useEffect } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

import { Wrapper } from "components/wrapper";
import { useGetBookings } from "state/booking.state";
import { useSetup } from "state/setup.state";
import { useNavigate } from "utils/nav";

export const BookingsScreen: React.FC = () => {
  const navigation = useNavigate();

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

  return (
    <Wrapper>
      {(getSetupStatus === "error" || getBookingsStatus === "error") && (
        <Text>There was an error getting the bookings</Text>
      )}
      
      {bookings && (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={getBookingsStatus === 'fetching'}
              onRefresh={() => getBookings(setup.operator.id)}
            />
          }
        >
          {bookings.map((bookings) => (
            <List.Item
              key={bookings._id}
              title={bookings.name}
              description={bookings.date}
              onPress={() => {
                navigation.push("booking", { bookingId: bookings._id });
              }}
            />
          ))}
        </ScrollView>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
    margin: 0,
  }
})