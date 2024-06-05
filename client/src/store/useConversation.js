import { create } from "zustand";

export const useConversation = create((set) => ({
  idSelected: "",
  setIdSelected: (id) => set({ idSelected: id }),
}));
