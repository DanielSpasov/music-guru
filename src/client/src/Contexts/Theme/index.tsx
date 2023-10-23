import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  ReactNode
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  setTheme: Dispatch<SetStateAction<Theme>>;
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem('theme') as Theme,
  setTheme: () => null
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem('theme') as Theme
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
