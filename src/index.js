import React from 'react';
import './normalize.css';
import App from './components/app/app';
import {createRoot} from "react-dom/client";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);