import * as Facebook from "expo-auth-session/providers/facebook";
import React from "react";

import { fetchFbUserInfo } from "clients/auth.client";
import { LoginButton } from "components/login/button-base";
import { LoginProps } from "components/login/props";
import { usePerformOAuthLogin } from "hooks/login.hook";
import { env } from "utils/env";

export const LoginWithFacebook: React.FC<LoginProps> = ({
  disabled,
  onLoading,
  onError,
  onSuccess,
}) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: env.fbAppId,
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
