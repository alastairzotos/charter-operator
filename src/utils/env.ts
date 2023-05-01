import Constants from "expo-constants";

const extra = Constants.expoConfig.extra;

export const env = {
  server: extra.server as string,
  fbAppId: extra.fbAppId as string,
  googleClientIdAndroid: extra.googleClientIdAndroid as string,
  googleClientIdIOS: extra.googleClientIdIOS as string,
  googleClientId: extra.googleClientId as string,
};

