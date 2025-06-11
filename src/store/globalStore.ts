import { create } from "zustand";

interface IPlayBookStore {
  token: string;
  setToken: (newValue: any) => void;
  videoFilter: any;
  setVideoFilter: (newValue: any) => void;
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
  pageLimit: number;
  setPageLimit: (newValue: number) => void;
}

const useGlobalStore = create<IPlayBookStore>((set) => ({
  token: localStorage.getItem("token") ?? "",
  setToken: (newValue: any) => {
    set({ token: newValue });
    localStorage.setItem("token", newValue);
  },
  videoFilter: null,
  setVideoFilter: (newValue: any) => {
    set({ videoFilter: newValue });
  },
  currentPage: 1,
  setCurrentPage: (newValue: number) => {
    set({ currentPage: newValue });
  },
  pageLimit: 20,
  setPageLimit: (newValue: number) => {
    set({ pageLimit: newValue });
  },
}));

export { useGlobalStore };
