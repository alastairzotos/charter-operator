import React, { useEffect } from "react";
import { ActivityIndicator, List, Text } from "react-native-paper";
import { ScrollView } from "react-native";
import { Wrapper } from "../components/wrapper";
import { useGetBookings } from "../state/booking.state";
import { useSetup } from "../state/setup.state";
import { useNavigate } from "../utils/nav";

export const BookingsScreen: React.FC = () => {
  const navigation = useNavigate();

  const { getSetupStatus, setup } = useSetup();
  const [getBookingsStatus, getBookings, bookings] = useGetBookings(s => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!!setup) {
      getBookings(setup.operator.id);
    }
  }, [setup]);

  return (
    <Wrapper>
      {(getSetupStatus === 'fetching' || getBookingsStatus === 'fetching') && <ActivityIndicator size="large" />}
      {(getSetupStatus === 'error' || getBookingsStatus === 'error') && (
        <Text>There was an error getting the bookings</Text>
      )}
      {bookings && (
        <ScrollView>
          {bookings.map(bookings => (
            <List.Item
              key={bookings._id}
              title={bookings.name}
              description={bookings.date}
              onPress={() => navigation.push("booking", { bookingId: bookings._id })}
            />
          ))}
        </ScrollView>
      )}
    </Wrapper>
  )
}
