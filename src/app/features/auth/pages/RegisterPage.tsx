import './RegisterPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api/authApi';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await registerApi({ name, email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed.');
            console.error('Registration failed:', err);
        }
    }

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>

                {error && <div className="error-message">{error}</div>}

                <label>
                    Name:
                    <input
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Email:
                    <input
                        required={true}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        required={true}
                        minLength={6}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}
