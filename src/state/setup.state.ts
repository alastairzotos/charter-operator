import { createQuery } from "@bitmetro/create-query";
import { getStorageItem, storageKeys } from "../storage";

export const useGetServer = createQuery(() => getStorageItem(storageKeys.server))
