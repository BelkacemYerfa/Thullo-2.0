import { create } from "zustand";
import { type Socket } from "socket.io-client";

interface ISocket {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

export const useSocketStore = create<ISocket>((set) => ({
  socket: {} as Socket,
  setSocket: (socket) => set({ socket }),
}));
