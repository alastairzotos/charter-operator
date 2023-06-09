import { type FetchStatus } from "@bitmetro/create-query";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

import { LoginWithEmailAndPassword } from "components/login/email-pwd";
import { LoginWithFacebook } from "components/login/login-facebook";
import { LoginWithGoogle } from "components/login/login-google";
import { LoginProps } from "components/login/props";
import { Wrapper } from "components/wrapper";
import { useConfiguration } from "hooks/configuration.hook";
import { useNavigate } from "utils/nav";

export const LoginScreen: React.FC = () => {
  const nav = useNavigate();
  const { googleLogin, facebookLogin } = useConfiguration();

  const [status, setStatus] = useState<FetchStatus | null>(null);

  const props: LoginProps = {
    disabled: status === "fetching",
    onError: () => setStatus("error"),
    onLoading: () => setStatus("fetching"),
    onSuccess: () => nav.push("home"),
  };

  return (
    <Wrapper>
      {(googleLogin || facebookLogin) && (
        <Text variant="titleMedium" style={styles.title}>
          Login
        </Text>
      )}

      {googleLogin && <LoginWithGoogle {...props} />}
      {facebookLogin && <LoginWithFacebook {...props} />}

      {(googleLogin || facebookLogin) && (
        <>
          <Divider bold style={styles.divider} />
          <Text style={styles.emailPwdTitle}>
            Login with email and password
          </Text>
        </>
      )}

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
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
