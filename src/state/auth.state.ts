import decodeJwt from "jwt-decode";
import { create } from "zustand";

import { LoggedInUser } from "models/auth";
import { clearStorageItem, getStorageItem, storageKeys } from "storage";

interface AuthState {
  initialised: boolean;
  accessToken?: string;
  loggedInUser?: LoggedInUser;
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
        set({
          accessToken,
          initialised: true,
          loggedInUser: decodeJwt(accessToken),
        });
      } else {
        set({ initialised: true });
      }
    });
  },

  setAccessToken: (accessToken) => {
    set({
      accessToken,
      loggedInUser: decodeJwt(accessToken),
    });
  },

  logout: () => {
    clearStorageItem(storageKeys.accessToken);
    set({
      initialised: false,
      accessToken: undefined,
      loggedInUser: undefined,
    });
  },
}));
