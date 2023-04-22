import { createHttpClient } from "@bitmetro/http-client";
import { useAuthState } from "../state/auth.state";
import { getSetup } from "../state/setup.state";
import { env } from "../utils/env";
import { getApiUrlForHost } from "../utils/host";

export const httpClient = async (server?: string) => {
  if (env.server) {
    return createHttpClient(`${env.server}/api/v1`, () => useAuthState.getState().accessToken);
  }

  if (!server) {
    const setup = await getSetup();
    server = setup.server;
  }

  const apiUrl = `https://${getApiUrlForHost(server)}/api/v1`;

  return createHttpClient(apiUrl, () => useAuthState.getState().accessToken);
}
