import { create } from "zustand";

interface IStore {
  rename: boolean;
  setRename: (rename: boolean) => void;
}

export const useGenerationStore = create<IStore>((set) => ({
  rename: false,
  setRename: (rename) => set({ rename }),
}));
