import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../state/store';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">📚 Online Bookstore</div>

            <div className="navbar-user">
                {user && <span>Hello, {user.email}</span>}
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </nav>
    )
}
