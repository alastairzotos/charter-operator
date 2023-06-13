import { createQuery } from "@bitmetro/create-query";

import {
  loginEmailPassword,
  loginOAuth,
  refreshToken,
} from "clients/auth.client";
import { LoginEmailPasswordDetails, type OAuthUserInfo } from "models/auth";
import { useAuthState } from "state/auth.state";
import { setStorageItem, storageKeys } from "storage";

const setAccessToken = async (accessToken: string) => {
  await setStorageItem(storageKeys.accessToken, accessToken);
  useAuthState.getState().setAccessToken(accessToken);
};

export const useOAuthLogin = createQuery(async (details: OAuthUserInfo) => {
  await setAccessToken(await loginOAuth(details));
});

export const useEmailPasswordLogin = createQuery(
  async (details: LoginEmailPasswordDetails) => {
    await setAccessToken(await loginEmailPassword(details));
  }
);

export const useRefreshToken = createQuery(async () => {
  await setAccessToken(await refreshToken());
});
