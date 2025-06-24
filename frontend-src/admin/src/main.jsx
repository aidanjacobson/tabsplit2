import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';

import api from '../../common/apiutils.js';

window.api = api;

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename="/admin">
            <App />
        </BrowserRouter>
  </StrictMode>,
)
