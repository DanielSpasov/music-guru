import { createContext } from 'react';

export const defaultValue = {
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
export const ThemeContext = createContext(defaultValue);
export const ThemeProvider = ThemeContext.Provider;
