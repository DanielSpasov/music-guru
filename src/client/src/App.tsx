import { useCallback, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { Themes } from './Components/Core/ThemeSwitcher/helpers';
import themes from './Components/Core/ThemeSwitcher/themes';
import { AuthProvider } from './Contexts/Auth';
import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalCSS } from './GlobalCSS';

export default function App() {
  const themePref = useMemo(() => {
    const savedTheme = localStorage.getItem('theme') as Themes;
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return savedTheme;
  }, []);
  const [theme, setTheme] = useState<Themes>(themePref);

  const selectTheme = useCallback((theme: Themes) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={{ ...themes[theme], setTheme: selectTheme }}>
        <AuthProvider>
          <Router />
        </AuthProvider>

        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          autoClose={3000}
          newestOnTop
          pauseOnFocusLoss={false}
          theme="dark"
        />
        <GlobalCSS />
      </ThemeProvider>
    </BrowserRouter>
  );
}
