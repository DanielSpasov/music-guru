import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  setTheme: Dispatch<SetStateAction<Theme>>;
  theme: Theme;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: localStorage.getItem('theme') as Theme,
  setTheme: () => null
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') as Theme;
    if (!currentTheme) {
      const newTheme = prefersDark.matches ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    }
    return currentTheme;
  });

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
