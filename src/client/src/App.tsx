import { BrowserRouter } from 'react-router-dom';

import { Navbar } from './Components';
import Router from './Router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
