import { BrowserRouter } from 'react-router-dom';

import { Navbar } from './Components';
import Router from './Router';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}
