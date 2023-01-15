import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, defaultAuth, IAuth } from './Contexts/Auth';
import { Loader } from './Components';
import Router from './Router';
import Api from './Api';

export default function App() {
  const [auth, setAuth] = useState<IAuth>(defaultAuth.auth);

  // TODO: Refactor so the useEffect doesn't fire requests non stop
  useEffect(() => {
    (async () => {
      try {
        if (auth.isAuthenticated !== null) return;

        const token = localStorage.getItem('AUTH') || '';
        if (!token) {
          setAuth({ isAuthenticated: false, uid: null });
          return;
        }

        const { uid } = await Api.user.validateToken(token);
        if (!uid) {
          setAuth({ isAuthenticated: false, uid: null });
          return;
        }

        setAuth({ isAuthenticated: true, uid });
      } catch (error) {
        setAuth({ isAuthenticated: false, uid: null });
      }
    })();
  }, [auth]);

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
      <AuthProvider value={{ auth, setAuth }}>
        <ThemeProvider theme={theme}>
          {auth.isAuthenticated === null ? (
            <Loader fullscreen rainbow />
          ) : (
            <Router />
          )}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
