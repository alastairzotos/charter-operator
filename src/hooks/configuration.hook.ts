import { createContext, useContext } from "react";

import { ConfigurationDto, defaultConfiguration } from "models/configuration";

export const ConfigurationContext =
  createContext<ConfigurationDto>(defaultConfiguration);
export const ConfigurationProvider = ConfigurationContext.Provider;

export const useConfiguration = () => useContext(ConfigurationContext);
