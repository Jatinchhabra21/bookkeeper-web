import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// eslint-disable-next-line no-undef
const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
