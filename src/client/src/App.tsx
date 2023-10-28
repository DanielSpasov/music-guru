import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

import { ThemeProvider, AuthProvider, Theme } from './Contexts';
import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem('theme') as Theme
  );

  return (
    <BrowserRouter>
      <ThemeProvider setTheme={setTheme} theme={theme}>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          autoClose={3000}
          newestOnTop
          pauseOnFocusLoss={false}
          theme={theme}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}
