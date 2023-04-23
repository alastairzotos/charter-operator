import { type RouteProp, useRoute } from "@react-navigation/native";
import React from "react";

import { BookingView } from "components/booking-view";
import { Wrapper } from "components/wrapper";
import { useNavigate } from "utils/nav";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

export const BookingScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ detail: { bookingId: string } }, "detail">>();
  const navigation = useNavigate();

  const bookingId = route.params.bookingId;

  const handleReset = () => {
    navigation.push("home");
  };

  return (
    <Wrapper>
      <BookingView bookingId={bookingId} />

      <Button onPress={handleReset} mode="contained" style={styles.scanButton}>
          Scan another QR code
        </Button>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    padding: 16,
    borderRadius: 1000,
  },
});
