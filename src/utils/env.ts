import Constants from "expo-constants";

const extra = Constants.expoConfig.extra;

export const env = {
  server: extra.server as string,
};
