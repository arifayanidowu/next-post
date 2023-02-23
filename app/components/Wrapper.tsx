"use client";
import { Oswald } from "@next/font/google";
import { useEffect } from "react";
import { useStore } from "../store";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const isDark = useStore((state) => state.isDark);
  const matches =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (isDark && matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark, matches]);

  return (
    <body
      className={`${oswald.className} mx-4 md:mx-48 xl:mx-96 bg-gray-50 dark:bg-slate-600 text-gray-600 dark:text-gray-200`}
    >
      {children}
    </body>
  );
};

export default Wrapper;
