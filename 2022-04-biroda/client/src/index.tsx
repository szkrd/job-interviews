import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// plain render is for react 17 and below, the new api uses `createRoot`
// see also: `types` in _tsconfig.json_ (why not render onto the body directly?
// because that would conflict with scripts injected to the body, eg. google fonts)
const rootEl = document.getElementById('root') as HTMLDivElement;
rootEl.style.height = '100%';
const root = createRoot(rootEl);
// <React.StrictMode> had to go, because of ant component errors
root.render(<App />);
