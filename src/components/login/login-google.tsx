import * as Google from "expo-auth-session/providers/google";
import React from "react";

import { fetchGoogleUserInfo } from "clients/auth.client";
import { LoginButton } from "components/login/button-base";
import { usePerformOAuthLogin } from "hooks/login.hook";
import { LoginProps } from "components/login/props";
import { env } from "utils/env";

export const LoginWithGoogle: React.FC<LoginProps> = ({
  disabled,
  onLoading,
  onError,
  onSuccess,
}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: env.googleClientIdAndroid,
    iosClientId: env.googleClientIdIOS,
    expoClientId: env.googleClientId,
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
