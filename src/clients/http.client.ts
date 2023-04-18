import { createHttpClient } from "@bitmetro/http-client";
import { getStorageItem, storageKeys } from "../storage";
import { getApiUrlForHost } from "../utils/host";

export const client = async () => {
  const server = await getStorageItem(storageKeys.server);
  const apiUrl = `https://${getApiUrlForHost(server)}/api/v1`;

  return createHttpClient(apiUrl);
}
