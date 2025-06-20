import './LoginPage.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import type { AppDispatch } from '../../../state/store';

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await dispatch(login({ email, password })).unwrap();
        } catch (err) {
            setError('Login failed');
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                {error && (
                    <div className="error-message" data-testid="error-message">
                        {error}
                    </div>
                )}
                <label>Email:
                    <input
                        required={true}
                        data-testid="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        required={true}
                        data-testid="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" data-testid="login-button">
                    Login
                </button>

                <p className="redirect-link">
                    Don’t have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
}
