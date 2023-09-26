import { InitialData } from "@/types";
import { create } from "zustand";

interface IStore {
  boardCard: boolean;
  newList: boolean;
  initialData: InitialData;
  setBoardCard: (boardCard: boolean) => void;
  setNewList: (newList: boolean) => void;
  setInitialData: (initialData: InitialData) => void;
}

export const useGenerationStore = create<IStore>((set) => ({
  boardCard: false,
  setBoardCard: (boardCard) => set({ boardCard }),
  newList: false,
  setNewList: (newList) => set({ newList }),
  initialData: {
    tasks: {},
    columns: {},
    columnOrder: [],
  },
  setInitialData: (initialData) => set({ initialData }),
}));
