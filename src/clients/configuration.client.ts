import { httpClient } from "clients/http.client";
import { ConfigurationDto } from "models/configuration";

export const getConfiguration = async () => {
  const { data } = await httpClient.get<ConfigurationDto>("/config");

  return data;
};
