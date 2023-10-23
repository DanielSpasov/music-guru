import {
  Dispatch,
  SetStateAction,
  useState,
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

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem('theme') as Theme,
  setTheme: () => null
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem('theme') as Theme
  );

  const body = useRef<HTMLBodyElement>(document.querySelector('body'));

  useEffect(() => {
    if (!body.current) return;
    body.current.className = `${theme} ${
      theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
    }`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
