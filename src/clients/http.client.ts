import axios, { AxiosInstance } from "axios";

import { useAuthState } from "state/auth.state";
import { env } from "utils/env";

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const httpClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  httpClient.interceptors.request.use((config) => {
    const accessToken = useAuthState.getState().accessToken;

    if (!!accessToken) {
      config.headers!.authentication = `Bearer ${accessToken}`;
    }

    const loggedInUser = useAuthState.getState().loggedInUser;

    const instance = loggedInUser?.instance;

    config.params = { instance };

    return config;
  }, console.error);

  return httpClient;
};

export const httpClient = createHttpClient(env.server + "/api/v1");
