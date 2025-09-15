"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={`group/dock relative h-10 w-10 cursor-pointer p-3 text-sm text-yellow-500 transition-all duration-300 ease-in-out focus-visible:outline-none dark:text-indigo-600 [&>svg]:fill-yellow-400 dark:[&>svg]:fill-indigo-500`}
      aria-label="Change theme button"
    >
      {theme === "dark" ? (
        <Sun className="h-full w-full" />
      ) : (
        <Moon className="h-full w-full" />
      )}
    </button>
  );
}
