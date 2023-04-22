import { createQuery } from "@bitmetro/create-query";
import { loginWithFacebook } from "../clients/oauth2.client";
import { FbLoginDetails } from "../models/oauth";
import { setStorageItem, storageKeys } from "../storage";
import { useAuthState } from "./auth.state";

export const useLoginWithFacebook = createQuery(
  async (response: FbLoginDetails) => {
    const accessToken = await loginWithFacebook(response);
    await setStorageItem(storageKeys.accessToken, accessToken);
    useAuthState.getState().setAccessToken(accessToken);
  }
);
