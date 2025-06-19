import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/state/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './app/features/auth/pages/LoginPage';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
