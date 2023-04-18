import React, { useEffect, useState } from "react";
import { useNavigate } from "../utils/nav";
import { BookingScanner } from "../components/booking-scanner";
import { Wrapper } from "../components/wrapper";
import { useGetServer } from "../state/setup.state";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigate();

  const [getServerStatus, getServer, server] = useGetServer(s => [s.status, s.request, s.value]);
  const [showBookingScanner, setShowBookingScanner] = useState(false);

  useEffect(() => {
    getServer();
  }, []);

  useEffect(() => {
    if (getServerStatus === 'success') {
      if (!server) {
        navigation.push("setup");
      } else {
        setTimeout(() => setShowBookingScanner(true), 500);
      }
    }
  }, [getServerStatus, server]);

  if (!getServerStatus) {
    return null;
  }

  return (
    <Wrapper>
      {!showBookingScanner && (
        <>
          {getServerStatus === "fetching" && <ActivityIndicator size="large" />}
          {getServerStatus === "error" && <Text>There was an unexpected error. Please restart the app.</Text>}
          {(getServerStatus === "success" && !server) && (
            <Button mode="contained" onPress={() => navigation.push("setup")}>
              Click to setup
            </Button>
          )}
        </>
      )}

      {showBookingScanner && <BookingScanner />}
    </Wrapper>
  );
}
