import { ActivityIndicator, Text } from "react-native-paper"
import { Wrapper } from "../components/wrapper"
import { useSetup } from "../state/setup.state"
import React, { useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { useNavigate } from "../utils/nav";
import { useLoginWithFacebook } from "../state/oauth2.state";
import { fetchFbUserInfo } from "../clients/oauth2.client";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen: React.FC = () => {
  const nav = useNavigate();
  const { setup } = useSetup();

  const [loginStatus, login] = useLoginWithFacebook(s => [s.status, s.request]);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: setup.oauth2.fbAppId,
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      fetchFbUserInfo(response.authentication.accessToken)
        .then(login)
        .then(() => nav.push("home"));
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

  if (loginStatus === 'error' || response?.type === 'error') {
    return (
      <Wrapper>
        <Text>There was an error</Text>
      </Wrapper>
    )
  }

  if (!setup || loginStatus === 'fetching') {
    return (
      <Wrapper>
        <ActivityIndicator size="large" />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Text variant="titleMedium" style={styles.title}>Login to {setup.server}</Text>

      <Button
        disabled={!request}
        title="Sign in with Facebook"
        onPress={handlePressAsync}
      />
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 20,
  }
})