import dayjs from "dayjs";
import React from "react";
import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

import { ReadableBooking } from "models/bookings";

interface Props {
  booking: ReadableBooking;
}

type BookingErrorType = "not-today" | "fulfilled";

const errorContent: Record<BookingErrorType, string> = {
  fulfilled: "This booking has been fulfilled",
  "not-today": "Booking is not for today",
};

export const DataErrorDisplay: React.FC<Props> = ({
  booking: { data, fulfilled },
}) => {
  const today = dayjs().format("DD MMM YYYY");

  let error: BookingErrorType | null = null;

  if (fulfilled) {
    error = "fulfilled";
  } else if (data.Date !== today) {
    error = "not-today";
  }

  if (!error) {
    return null;
  }

  return (
    <Surface style={styles.surface}>
      <Text style={styles.error}>⚠️ {errorContent[error]}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 12,
  },
  error: {
    color: "#ff2c00",
  },
});
