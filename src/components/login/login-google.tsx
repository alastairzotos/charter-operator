import * as Google from "expo-auth-session/providers/google";
import React from "react";

import { fetchGoogleUserInfo } from "clients/oauth2.client";
import { LoginButton } from "components/login/button-base";
import { type LoginProps } from "components/login/props";
import { usePerformOAuthLogin } from "hooks/login.hook";

export const LoginWithGoogle: React.FC<LoginProps> = ({
  setup,
  onLoading,
  onError,
  onSuccess,
}) => {
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
    onSuccess,
  });

  return (
    <LoginButton
      prompt="Sign in with Google"
      disabled={!request}
      onPress={async () => await promptAsync()}
    />
  );
};
