import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Welcome } from './pages/welcome';

const root = createRoot(document.getElementById('root'));


root.render(
  <React.Fragment>
    <Welcome />
  </React.Fragment>
)
