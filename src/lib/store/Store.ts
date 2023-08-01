import { create } from "zustand";

interface IStore {
  rename: boolean;
  boardCard: boolean;
  newList: boolean;
  setRename: (rename: boolean) => void;
  setBoardCard: (boardCard: boolean) => void;
  setNewList: (newList: boolean) => void;
}

export const useGenerationStore = create<IStore>((set) => ({
  rename: false,
  setRename: (rename) => set({ rename }),
  boardCard: false,
  setBoardCard: (boardCard) => set({ boardCard }),
  newList: false,
  setNewList: (newList) => set({ newList }),
}));
