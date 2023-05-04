import React from "react";
import { List } from "react-native-paper";

import { BookingItem } from "models/bookings";
import { useNavigate } from "utils/nav";

interface Props {
  bookings?: BookingItem[];
}

export const BookingList: React.FC<Props> = ({ bookings }) => {
  const navigation = useNavigate();

  if (!bookings) {
    return null;
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
