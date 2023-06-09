import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageKeys = {
  pushToken: "@charter:push-token",
  accessToken: "@charter/access-token",
} satisfies Record<string, string>;

export const getStorageItem = async (
  key: string
): Promise<string | undefined> => {
  return await AsyncStorage.getItem(key);
};

export const setStorageItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const clearStorageItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
