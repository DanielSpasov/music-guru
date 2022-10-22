import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  primary: '',
  secondary: '',
  base: '',
  baseLight: '',
  baseLighter: '',
  baseLightest: ''
});
export const ThemeProvider = ThemeContext.Provider;
