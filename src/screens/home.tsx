import React from "react";
import { Button } from "react-native-paper";

import { BookingScanner } from "components/booking-scanner";
import { Wrapper } from "components/wrapper";
import { useAuthState } from "state/auth.state";
import { useNavigate } from "utils/nav";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigate();
  const { accessToken } = useAuthState();

  return (
    <Wrapper>
      {!accessToken && (
        <Button mode="contained" onPress={() => navigation.push("login")}>
          Login
        </Button>
      )}

      {!!accessToken && <BookingScanner />}
    </Wrapper>
  );
};
