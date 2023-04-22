import React, { useState } from "react";
import { Wrapper } from "../components/wrapper";
import { SetupScanner } from "../components/setup-scanner";
import { useSetup } from "../state/setup.state";
import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const SetupScreen: React.FC = () => {
  const { setup } = useSetup();
  const [showSetupScanner, setShowSetupScanner] = useState(false);

  return (
    <Wrapper>
      {!showSetupScanner && (
        <>
          {!!setup && <Text>You are currently connected as {setup.operator.name}. Do you want to connect to another account?</Text>}
          <Button style={styles.button} mode="contained" onPress={() => setShowSetupScanner(true)}>
            Connect to an account
          </Button>
        </>
      )}

      {showSetupScanner && <SetupScanner />}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  }
})