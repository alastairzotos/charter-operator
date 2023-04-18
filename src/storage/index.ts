import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  setup: '@charter:setup',
}

export const getStorageItem = async (key: string): Promise<string | undefined> => {
  return await AsyncStorage.getItem(key);
}

export const setStorageItem = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, value);
}
