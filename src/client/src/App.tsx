import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { useMemo } from 'react';

import { AuthProvider } from './Contexts/Auth';
import Router from './Router';

export default function App() {
  const theme = useMemo(() => {
    const pref = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    return {
      colors: {
        // Indicator colors
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        // Main colors
        text: `var(--${pref}-text)`,
        primary: `var(--${pref}-primary)`,
        secondary: `var(--${pref}-secondary)`,
        // Base colors
        base: `var(--${pref}-base)`,
        baseLight: `var(--${pref}-base-light)`,
        baseLighter: `var(--${pref}-base-lighter)`,
        baseLightest: `var(--${pref}-base-lightest)`
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
