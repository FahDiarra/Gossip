import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "default" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }) {

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "default";
  });


  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {

  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = () => {
    if (theme === "default") {
      root.dataset.theme = media.matches ? "dark" : "light";
    } else {
      root.dataset.theme = theme;
    }
  };

  applyTheme();
  media.addEventListener("change", applyTheme);

  return () => media.removeEventListener("change", applyTheme);

  }, [theme]);


  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}