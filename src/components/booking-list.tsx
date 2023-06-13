import React from "react";
import { StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";

import { BookingItem } from "models/bookings";
import { useNavigate } from "utils/nav";

interface Props {
  bookings?: BookingItem[];
}

export const BookingList: React.FC<Props> = ({ bookings }) => {
  const navigation = useNavigate();

  if (!bookings || bookings.length === 0) {
    return <Text style={styles.noBookingsText}>No bookings here</Text>;
  }

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  noBookingsText: {
    textAlign: "center",
    paddingTop: 16,
  },
});
