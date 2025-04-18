import { create } from "zustand";

export interface DrawerStore {
  isOpen: boolean;
  toggleOpen: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
