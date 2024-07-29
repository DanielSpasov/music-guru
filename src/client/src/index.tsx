import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

const appRoot = createRoot(document.getElementById('root') as HTMLElement);
appRoot.render(<App />);
