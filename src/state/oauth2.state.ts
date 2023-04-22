import { createQuery } from "@bitmetro/create-query";

import { login } from "clients/oauth2.client";
import { type OAuthUserInfo } from "models/oauth";
import { useAuthState } from "state/auth.state";
import { setStorageItem, storageKeys } from "storage";

export const useOAuthLogin = createQuery(async (response: OAuthUserInfo) => {
  const accessToken = await login(response);
  await setStorageItem(storageKeys.accessToken, accessToken);
  useAuthState.getState().setAccessToken(accessToken);
});
