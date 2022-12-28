import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AuthProvider, defaultAuth, IAuth } from './Contexts/Auth';
import { ThemeProvider, defaultTheme } from './Contexts/Theme';
import { Loader } from './Components';
import Api from './Api';

// import PrivateRouter from './Router/Private';
// import PublicRouter from './Router/Public';
import Router from './Router';

export default function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [auth, setAuth] = useState<IAuth>(defaultAuth.auth);

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

  useEffect(() => {
    const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    setTheme(prev => ({
      ...prev,
      preferedTheme,
      primary: `var(--${preferedTheme}-primary)`,
      secondary: `var(--${preferedTheme}-secondary)`,
      base: `var(--${preferedTheme}-base)`,
      baseLight: `var(--${preferedTheme}-base-light)`,
      baseLighter: `var(--${preferedTheme}-base-lighter)`,
      baseLightest: `var(--${preferedTheme}-base-lightest)`
    }));
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider value={{ auth, setAuth }}>
        <ThemeProvider value={theme}>
          {auth.isAuthenticated === null && <Loader />}
          <Router />
          {/* {auth.isAuthenticated ? <PrivateRouter /> : <PublicRouter />} */}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
