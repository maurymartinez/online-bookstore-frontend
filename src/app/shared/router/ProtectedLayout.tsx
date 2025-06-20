import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../state/store';

export default function ProtectedLayout() {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? <Outlet /> : <Navigate to="/login" />;
}
