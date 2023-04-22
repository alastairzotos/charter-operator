import React from "react";
import { Button } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import { fetchFbUserInfo } from "../../clients/oauth2.client";
import { LoginProps } from "./props";
import { usePerformOAuthLogin } from "../../hooks/login.hook";
import { LoginButton } from "./button-base";

export const LoginWithFacebook: React.FC<LoginProps> = ({ setup, onLoading, onError, onSuccess }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: setup.oauth2.fbAppId,
  });

  usePerformOAuthLogin({
    response,
    fetchInfo: fetchFbUserInfo,
    onError,
    onLoading,
    onSuccess
  });

  const handleLoginClick = async () => {
    const result = await promptAsync();

    if (result.type !== "success") {
      onError();
    }
  };

  return (
    <LoginButton
      prompt="Sign in with Facebook"
      disabled={!request}
      onPress={handleLoginClick}
    />
  )
}
