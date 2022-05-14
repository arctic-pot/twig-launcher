import './index.css';
import './material-symbols.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './ui/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(React.createElement(App));
