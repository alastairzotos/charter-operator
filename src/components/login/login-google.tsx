import * as Google from "expo-auth-session/providers/google";
import React from "react";

import { fetchGoogleUserInfo } from "clients/auth.client";
import { LoginButton } from "components/login/button-base";
import { usePerformOAuthLogin } from "hooks/login.hook";
import { OAuthLoginProps } from "components/login/props";

export const LoginWithGoogle: React.FC<OAuthLoginProps> = ({
  setup,
  disabled,
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
      disabled={!request || disabled}
      onPress={async () => await promptAsync()}
    />
  );
};
