import { createHttpClient } from "@bitmetro/http-client";
import { getStorageItem, storageKeys } from "../storage";
import { getApiUrlForHost } from "../utils/host";

const apiUrl = `https://${getApiUrlForHost(getStorageItem(storageKeys.host))}/api/v1`;

export const httpClient = createHttpClient(apiUrl);
