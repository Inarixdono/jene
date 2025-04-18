import { create } from "zustand";

interface DialogState {
  open: boolean;
  editing: boolean;
  currentId: number | undefined;
  toggleOpen: (id?: number) => void;
  toggleEditting: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  editing: false,
  currentId: undefined,
  toggleOpen: (id) => {
    set((state) => ({
      open: !state.open,
      currentId: id ?? state.currentId,
      editing: false,
    }));
  },
  toggleEditting: () => set((state) => ({ editing: !state.editing })),
}));
