import { describe, it, expect } from 'vitest';
import authReducer, { type AuthState, login } from '../slices/authSlice';

describe('authSlice', () => {
    it('should store user and token when login is fulfilled', () => {
        const prevState: AuthState = {
            user: null,
            token: null,
            status: 'idle',
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
