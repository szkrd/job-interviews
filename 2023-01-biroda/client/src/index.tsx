import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MainLayout from './components/MainLayout';
import ErrorPage from './components/ErrorPage';
import LandingPage from './components/LandingPage';
import SearchResultsPage from './components/SearchResultsPage';

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/search',
        element: <SearchResultsPage />,
      },
    ],
  },
]);

// plain render is for react 17 and below, the new api uses `createRoot`
// see also: `types` in _tsconfig.json_ (why not render onto the body directly?
// because that would conflict with scripts injected to the body, eg. google fonts)
const rootEl = document.getElementById('root') as HTMLDivElement;
rootEl.style.height = '100%';
const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
