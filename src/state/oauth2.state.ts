import { createQuery } from "@bitmetro/create-query";
import { login } from "../clients/oauth2.client";
import { OAuthUserInfo } from "../models/oauth";
import { setStorageItem, storageKeys } from "../storage";
import { useAuthState } from "./auth.state";

const setAccessToken = async (accessToken: string) => {
  await setStorageItem(storageKeys.accessToken, accessToken);
  useAuthState.getState().setAccessToken(accessToken);
}

export const useOAuthLogin = createQuery(
  async (response: OAuthUserInfo) => 
    await setAccessToken(await login(response))
);
