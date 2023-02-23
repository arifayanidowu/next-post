"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useStore } from "../store";

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useStore((state) => state);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const matches =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (typeof window !== "undefined" && isMounted) {
      if (isDark || (isDark === undefined && matches)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDark, isMounted]);

  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
      <ToastContainer autoClose={3000} />
    </QueryClientProvider>
  );
};

export default QueryWrapper;
