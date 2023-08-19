import { create } from "zustand";

interface IStore {
  boardCard: boolean;
  newList: boolean;
  setBoardCard: (boardCard: boolean) => void;
  setNewList: (newList: boolean) => void;
}

export const useGenerationStore = create<IStore>((set) => ({
  boardCard: false,
  setBoardCard: (boardCard) => set({ boardCard }),
  newList: false,
  setNewList: (newList) => set({ newList }),
}));
