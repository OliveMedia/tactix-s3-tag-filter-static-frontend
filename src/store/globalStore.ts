import { create } from "zustand";

interface IPlayBookStore {
  token: string;
  setToken: (newValue: any) => void;
}

const useGlobalStore = create<IPlayBookStore>((set) => ({
  token: localStorage.getItem("token") ?? "",
  setToken: (newValue: any) => {
    set({ token: newValue });
    localStorage.setItem("token", newValue);
  },
}));

export { useGlobalStore };
