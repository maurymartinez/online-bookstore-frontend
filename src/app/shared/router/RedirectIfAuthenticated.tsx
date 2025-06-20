import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../../state/store';
import type { JSX } from 'react';

export default function RedirectIfAuthenticated({ children }: { children: JSX.Element }) {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? <Navigate to="/books" /> : children;
}
