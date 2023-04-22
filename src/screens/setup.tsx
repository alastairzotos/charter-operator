import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import { SetupScanner } from "components/setup-scanner";
import { useSetup } from "state/setup.state";
import { Wrapper } from "components/wrapper";

export const SetupScreen: React.FC = () => {
  const { setup } = useSetup();
  const [showSetupScanner, setShowSetupScanner] = useState(false);

  if (!showSetupScanner) {
    return (
      <Wrapper>
        {!!setup && (
          <Text>
            You are currently connected as {setup.operator.name}. Do you want
            to connect to another account?
          </Text>
        )}
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => setShowSetupScanner(true)}
        >
          Connect to an account
        </Button>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <SetupScanner />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});
