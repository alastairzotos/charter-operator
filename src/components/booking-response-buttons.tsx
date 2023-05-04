import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { BookingStatus } from "models/bookings";
import { useSetBookingStatus } from "state/booking.state";
import { useNavigate } from "utils/nav";

interface Props {
  bookingId: string;
}

export const BookingResponseButtons: React.FC<Props> = ({ bookingId }) => {
  const nav = useNavigate();
  const { status: updateStatus, request: setBookingStatus } =
    useSetBookingStatus();

  const handleSetStatus = async (status: BookingStatus) => {
    await setBookingStatus(bookingId, status);
    nav.push("booking", { bookingId });
  };

  const handleRejectPress = () => {
    Alert.alert(
      "Reject booking?",
      "Are you sure you want to reject the booking?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => handleSetStatus("rejected"),
        },
      ]
    );
  };

  const handleConfirmPress = () => {
    Alert.alert(
      "Confirm booking",
      "Confirm this booking? This will charge the customer",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Approve",
          style: "default",
          onPress: () => handleSetStatus("confirmed"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleConfirmPress}
        disabled={updateStatus === "fetching"}
      >
        Approve
      </Button>

      <Button
        onPress={handleRejectPress}
        disabled={updateStatus === "fetching"}
      >
        Reject
      </Button>

      {updateStatus === "error" && (
        <Text>There was an error. Please try again later</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
