import { createHttpClient } from "@bitmetro/http-client";
import { getSetup } from "../state/setup.state";
import { getApiUrlForHost } from "../utils/host";

export const client = async () => {
  const setup = await getSetup();
  const apiUrl = `https://${getApiUrlForHost(setup.server)}/api/v1`;

  return createHttpClient(apiUrl);
}
