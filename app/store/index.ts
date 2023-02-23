"use client";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface State {
  isDark: boolean;
}

export interface StoreActions {
  setTheme: () => void;
}

const initialState = {
  isDark: false,
};

export const useStore = create<State & StoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        isDark: false,
        setTheme: () => {
          const theme = !get().isDark;
          set({ isDark: theme }, undefined, "setTheme");
        },
      }),
      { name: "theme", storage: createJSONStorage(() => localStorage) }
    )
  )
);
