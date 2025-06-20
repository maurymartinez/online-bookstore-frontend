import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, { type AuthState, login, logout } from '../slices/authSlice';

describe('authSlice', () => {
    it('should store user and token when login is fulfilled', () => {
        const prevState: AuthState = {
            user: null,
            token: null,
        };

        const action = {
            type: login.fulfilled.type,
            payload: {
                user: { email: 'test@example.com' },
                token: 'fake-token',
            },
        };

        const state = authReducer(prevState, action);

        expect(state.user).toEqual({ email: 'test@example.com' });
        expect(state.token).toBe('fake-token');
    });
});

describe('authSlice - logout', () => {
    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            removeItem: vi.fn(),
            getItem: vi.fn(() => 'fake-token'),
            setItem: vi.fn(),
            clear: vi.fn(),
        })
    })

    it('clears user and token on logout', () => {
        const prevState: AuthState = {
            user: { email: 'test@example.com' },
            token: 'fake-token',
        }

        const nextState = authReducer(prevState, logout());

        expect(nextState.user).toBeNull();
        expect(nextState.token).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    })
})
