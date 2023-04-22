import React from "react";
import * as Google from "expo-auth-session/providers/google";
import { LoginProps } from "./props";
import { fetchGoogleUserInfo } from "../../clients/oauth2.client";
import { usePerformOAuthLogin } from "../../hooks/login.hook";
import { LoginButton } from "./button-base";

export const LoginWithGoogle: React.FC<LoginProps> = ({ setup, onLoading, onError, onSuccess }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: setup.oauth2.googleClientIdAndroid,
    iosClientId: setup.oauth2.googleClientIdIOS,
    expoClientId: setup.oauth2.googleClientId,
  });

  usePerformOAuthLogin({
    response,
    fetchInfo: fetchGoogleUserInfo,
    onError,
    onLoading,
    onSuccess
  });

  return (
    <LoginButton
      prompt="Sign in with Google"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
}
