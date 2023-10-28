import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useEffect,
  useRef
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  setTheme: Dispatch<SetStateAction<Theme>>;
  theme: Theme;
}

type ThemeProviderProps = {
  children: ReactNode;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem('theme') as Theme,
  setTheme: () => null
});

export function ThemeProvider({
  children,
  theme,
  setTheme
}: ThemeProviderProps) {
  const body = useRef<HTMLBodyElement>(document.querySelector('body'));

  useEffect(() => {
    if (!body.current) return;
    body.current.className = `${theme} ${
      theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'
    }`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
