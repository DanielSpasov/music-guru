import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './Contexts/Theme';
import { Navbar } from './Components';
import Router from './Router';
import { useEffect, useState } from 'react';

export default function App() {
  const [defaultTheme, setDefaultTheme] = useState({
    theme: '',
    primary: '',
    secondary: '',
    base: '',
    baseLight: '',
    baseLighter: '',
    baseLightest: ''
  });

  useEffect(() => {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setDefaultTheme({
      theme,
      primary: `var(--${theme}-primary)`,
      secondary: `var(--${theme}-secondary)`,
      base: `var(--${theme}-base)`,
      baseLight: `var(--${theme}-baseLight)`,
      baseLighter: `var(--${theme}-baseLighter)`,
      baseLightest: `var(--${theme}-baseLightest)`
    });
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider value={defaultTheme}>
        <Navbar />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}
