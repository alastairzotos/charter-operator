import { createHttpClient } from "@bitmetro/http-client";
import { getSetup } from "../state/setup.state";
import { getApiUrlForHost } from "../utils/host";

export const client = async (server?: string) => {
  if (!server) {
    const setup = await getSetup();
    server = setup.server;
  }

  const apiUrl = `https://${getApiUrlForHost(server)}/api/v1`;

  return createHttpClient(apiUrl);
}
