import { create } from "zustand";

import { getStorageItem, storageKeys } from "storage";

interface AuthState {
  initialised: boolean;
  accessToken?: string;
}

interface AuthStateActions {
  setup: () => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState & AuthStateActions>((set) => ({
  initialised: false,

  setup: () => {
    set({ initialised: false });
    getStorageItem(storageKeys.accessToken).then((accessToken) => {
      if (accessToken) {
        set({ accessToken, initialised: true });
      }
    });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  logout: () => {
    set({ initialised: false, accessToken: undefined });
  },
}));
