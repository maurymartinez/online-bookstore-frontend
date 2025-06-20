import { Routes, Route } from 'react-router-dom';
import LoginPage from './app/features/auth/pages/LoginPage';
import BooksPage from './app/features/catalog/pages/BooksPage';
import ProtectedLayout from './app/shared/router/ProtectedLayout.tsx';
import RedirectIfAuthenticated from './app/shared/router/RedirectIfAuthenticated';

export default function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <RedirectIfAuthenticated>
                        <LoginPage />
                    </RedirectIfAuthenticated>
                }
            />

            <Route element={<ProtectedLayout />}>
                <Route path="/books" element={<BooksPage />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
        </Routes>
    )
}
