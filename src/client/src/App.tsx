import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Router from './Router';
import { ThemeProvider, defaultValue } from './Contexts/Theme';

export default function App() {
  const [defaultTheme, setDefaultTheme] = useState(defaultValue);

  useEffect(() => {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    setDefaultTheme(prev => ({
      ...prev,
      theme,
      primary: `var(--${theme}-primary)`,
      secondary: `var(--${theme}-secondary)`,
      base: `var(--${theme}-base)`,
      baseLight: `var(--${theme}-base-light)`,
      baseLighter: `var(--${theme}-base-lighter)`,
      baseLightest: `var(--${theme}-base-lightest)`
    }));
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider value={defaultTheme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}
