import { Routes, Route } from 'react-router-dom';
import LoginPage from './app/features/auth/pages/LoginPage';
import RegisterPage from './app/features/auth/pages/RegisterPage.tsx';
import BooksPage from './app/features/catalog/pages/BooksPage';
import ProtectedLayout from './app/shared/router/ProtectedLayout.tsx';
import RedirectIfAuthenticated from './app/shared/router/RedirectIfAuthenticated';

export default function App() {
    return (
        <Routes>
            <Route element={<RedirectIfAuthenticated />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedLayout />}>
                <Route path="/books" element={<BooksPage />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
        </Routes>
    )
}
