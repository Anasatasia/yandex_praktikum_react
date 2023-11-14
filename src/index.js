import React from 'react';
import './normalize.css';
import App from './components/app/app';
import {createRoot} from "react-dom/client";
import { Provider } from 'react-redux';
import store from "./services/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <App />
            </Provider>
        </DndProvider>
    </React.StrictMode>
);