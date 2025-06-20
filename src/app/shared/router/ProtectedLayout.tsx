import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../state/store';
import Navbar from '../../features/auth/ui/Navbar';

export default function ProtectedLayout() {
    const token = useSelector((state: RootState) => state.auth.token);

    return !token ? <Navigate to="/login" />
        : (
        <>
            <Navbar />
            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </>
    );
}
