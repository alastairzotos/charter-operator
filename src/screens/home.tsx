import React from "react";
import { Button } from "react-native-paper";

import { BookingScanner } from "components/booking-scanner";
import { Wrapper } from "components/wrapper";
import { useSetup } from "state/setup.state";
import { useNavigate } from "utils/nav";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigate();
  const { getSetupStatus, setup } = useSetup();

  if (!getSetupStatus) {
    return null;
  }

  return (
    <Wrapper>
      {!setup && (
        <Button
          mode="contained"
          onPress={() => {
            navigation.push("setup");
          }}
        >
          Connect to account
        </Button>
      )}

      {!!setup && <BookingScanner />}
    </Wrapper>
  );
};
