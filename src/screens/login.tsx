import { type FetchStatus } from "@bitmetro/create-query";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Divider, Text } from "react-native-paper";

import { LoginWithFacebook } from "components/login/login-facebook";
import { LoginWithGoogle } from "components/login/login-google";
import { Wrapper } from "components/wrapper";
import { useSetup } from "state/setup.state";
import { useNavigate } from "utils/nav";
import { LoginWithEmailAndPassword } from "components/login/email-pwd";
import { LoginProps } from "components/login/props";
import { CenterScreen } from "components/center-screen";

export const LoginScreen: React.FC = () => {
  const nav = useNavigate();
  const { setup } = useSetup();
  const [status, setStatus] = useState<FetchStatus | null>(null);

  const props: LoginProps = {
    disabled: status === 'fetching',
    onError: () => setStatus('error'),
    onLoading: () => setStatus('fetching'),
    onSuccess: () => nav.push('home'),
  }

  if (!setup) {
    return (
      <CenterScreen>
        <ActivityIndicator />
      </CenterScreen>
    )
  }

  return (
    <Wrapper>
      <Text variant="titleMedium" style={styles.title}>
        Login to {setup.server}
      </Text>

      <LoginWithFacebook setup={setup} {...props} />

      <LoginWithGoogle setup={setup} {...props} />

      <Divider bold style={styles.divider} />

      <Text style={styles.emailPwdTitle}>Login with email and password</Text>

      <LoginWithEmailAndPassword {...props} />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    margin: 20,
  },
  emailPwdTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
