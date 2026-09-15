import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Bản build có HTML dựng sẵn → hydrate. `npm run dev` thì #root rỗng → render thường.
if (root.firstChild) hydrateRoot(root, app);
else createRoot(root).render(app);
