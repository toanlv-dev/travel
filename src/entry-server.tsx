import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** Dựng sẵn HTML lúc build — xem scripts/prerender.mjs. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
