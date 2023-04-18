import { createQuery } from "@bitmetro/create-query";
import { getStorageItem, setStorageItem, storageKeys } from "../storage";
import { SetupDto } from '../models/setup';
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export const getSetup = async () => {
  const data = await getStorageItem(storageKeys.setup);

  if (!data) {
    return undefined;
  }

  return SetupDto.parse(JSON.parse(data));
};

const useGetSetup = createQuery(getSetup);

export const useSetup = () => {
  const isFocused = useIsFocused();
  const [getSetupStatus, getSetup, setup, error] = useGetSetup(s => [s.status, s.request, s.value, s.error]);

  useEffect(() => {
    if (!setup) {
      getSetup();
    }
  }, [isFocused]);

  return { getSetupStatus, getSetup, setup, error }
}

export const saveSetup = async (setup: SetupDto) => {
  await setStorageItem(storageKeys.setup, JSON.stringify(setup));
  useGetSetup.setState({ status: 'success', value: setup });
}