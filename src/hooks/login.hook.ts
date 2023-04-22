import { useEffect } from "react";
import { AuthSessionResult } from "expo-auth-session";
import { OAuthUserInfo } from "../models/oauth";
import { useOAuthLogin } from "../state/oauth2.state";

interface Props {
  response: AuthSessionResult;
  fetchInfo: (token: string) => Promise<OAuthUserInfo>;
  onSuccess: () => void;
  onLoading: () => void;
  onError: () => void;
}

export const usePerformOAuthLogin = ({
  response,
  fetchInfo,
  onSuccess,
  onLoading,
  onError,
}: Props) => {
  const { status, request: login } = useOAuthLogin();

  useEffect(() => {
    if (response) {
      if (response.type === "success" && response.authentication) {
        fetchInfo(response.authentication.accessToken)
          .then(login)
          .then(onSuccess);
      } else if (response.type === "error") {
        onError();
      }
    }
  }, [response]);

  useEffect(() => {
    if (status === 'error') {
      onError();
    } else if (status === 'fetching') {
      onLoading();
    }
  }, [status]);
}
