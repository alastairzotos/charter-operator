import { create } from 'zustand';

interface Values {
  camera: boolean;
}

interface Actions {
  setCameraStatus: (camera: boolean) => void;
}

export const usePermissionsStatus = create<Values & Actions>((set) => ({
  camera: false,

  setCameraStatus: (camera: boolean) => set({ camera })
}))
