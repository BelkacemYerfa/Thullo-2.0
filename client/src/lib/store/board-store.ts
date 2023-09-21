import { create } from "zustand";

interface BoardStore {
  draggingCard: string | null;
  setDraggingCard: (draggingCard: string | null) => void;
  draggingList: string | null;
  setDraggingList: (draggingList: string | null) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (draggingCard) => set({ draggingCard }),
  draggingList: null,
  setDraggingList: (draggingList) => set({ draggingList }),
}));
