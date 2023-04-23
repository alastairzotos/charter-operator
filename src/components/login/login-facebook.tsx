import * as Facebook from "expo-auth-session/providers/facebook";
import React from "react";

import { fetchFbUserInfo } from "clients/auth.client";
import { LoginButton } from "components/login/button-base";
import { OAuthLoginProps } from "components/login/props";
import { usePerformOAuthLogin } from "hooks/login.hook";

export const LoginWithFacebook: React.FC<OAuthLoginProps> = ({
  setup,
  disabled,
  onLoading,
  onError,
  onSuccess,
}) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: setup.oauth2.fbAppId,
  });

  usePerformOAuthLogin({
    response,
    fetchInfo: fetchFbUserInfo,
    onError,
    onLoading,
    onSuccess,
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
      disabled={!request || disabled}
      onPress={handleLoginClick}
    />
  );
};
