import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './app/page';
import ProjectDocumentationPage from './app/project-documentation/page';
import './styles/tailwind.css';

const app = window.location.pathname === '/project-documentation'
  ? <ProjectDocumentationPage />
  : <HomePage />;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
);