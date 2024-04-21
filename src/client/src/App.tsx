import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, AuthProvider, Theme } from './Contexts';
import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          autoClose={3000}
          newestOnTop
          pauseOnFocusLoss={false}
          theme={localStorage.getItem('theme') as Theme}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}
