import { createContext } from 'react';

export const defaultTheme = {
  theme: '',
  primary: '',
  secondary: '',
  base: '',
  baseLight: '',
  baseLighter: '',
  baseLightest: '',
  success: 'var(--success)',
  danger: 'var(--danger)',
  warning: 'var(--warning)',
  info: 'var(--info)'
};

export const ThemeContext = createContext(defaultTheme);
export const ThemeProvider = ThemeContext.Provider;
