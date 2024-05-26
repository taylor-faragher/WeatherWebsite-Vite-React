import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorPage} from './pages';
import AppRoutes from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
