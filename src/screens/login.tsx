import { type FetchStatus } from "@bitmetro/create-query";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { LoginWithFacebook } from "components/login/login-facebook";
import { LoginWithGoogle } from "components/login/login-google";
import { Wrapper } from "components/wrapper";
import { useSetup } from "state/setup.state";
import { useNavigate } from "utils/nav";

export const LoginScreen: React.FC = () => {
  const nav = useNavigate();
  const { setup } = useSetup();
  const [status, setStatus] = useState<FetchStatus | null>(null);

  const handleSuccess = () => {
    nav.push("home");
  };

  if (!setup || status === "fetching") {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Wrapper>
      <Text variant="titleMedium" style={styles.title}>
        Login to {setup.server}
      </Text>

      <LoginWithFacebook
        setup={setup}
        onLoading={() => {
          setStatus("fetching");
        }}
        onError={() => {
          setStatus("error");
        }}
        onSuccess={handleSuccess}
      />

      <LoginWithGoogle
        setup={setup}
        onLoading={() => {
          setStatus("fetching");
        }}
        onError={() => {
          setStatus("error");
        }}
        onSuccess={handleSuccess}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
});
