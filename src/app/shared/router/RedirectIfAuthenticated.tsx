import { useSelector } from 'react-redux';
import { Navigate, Outlet  } from 'react-router-dom';
import type { RootState } from '../../state/store';

export default function RedirectIfAuthenticated() {
    const token = useSelector((state: RootState) => state.auth.token)
    return token ? <Navigate to="/books" replace /> : <Outlet />
}
