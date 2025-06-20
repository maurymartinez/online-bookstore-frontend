import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../api/axios';

describe('Axios interceptor', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(() => 'test-token'),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        });
    })

    it('adds Authorization header if token exists in localStorage', async () => {
        const requestConfig = await api.interceptors.request.handlers[0].fulfilled({
            headers: {},
        });

        expect(requestConfig.headers.Authorization).toBe('Bearer test-token');
    })

    it('does not add Authorization header if no token exists', async () => {
        (localStorage.getItem as any).mockReturnValueOnce(null);

        const requestConfig = await api.interceptors.request.handlers[0].fulfilled({
            headers: {},
        });

        expect(requestConfig.headers.Authorization).toBeUndefined();
    })
})