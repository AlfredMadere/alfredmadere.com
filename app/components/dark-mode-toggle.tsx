import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

// Uses ThemeProvider's useTheme() for standard theme control
export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"

      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="hover:text-gray-300 cursor-pointer transition-colors"
    >
      {isDark ? <Sun className="size-6" /> : <Moon className="size-6" />}
    </button>
  );
}

