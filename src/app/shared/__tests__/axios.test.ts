import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
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

describe('Axios response interceptor', () => {
    let originalLocation: Location;

    beforeEach(() => {
        vi.resetAllMocks();

        vi.stubGlobal('localStorage', {
            getItem: vi.fn(() => 'test-token'),
            removeItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
        });

        originalLocation = window.location;

        delete window.location;
        window.location = { href: '' } as any;
    })

    afterAll(() => {
        window.location = originalLocation;
    })

    it('redirects to /login and clears token on 401 response', async () => {
        const fakeError = { response: { status: 401 }, config: {} };

        try {
            await api.interceptors.response.handlers[0].rejected(fakeError);
        } catch (_) {}

        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(window.location.href).toBe('/login');
    })

    it('redirects to /login and clears token on 403 response', async () => {
        const fakeError = { response: { status: 403 }, config: {} };

        try {
            await api.interceptors.response.handlers[0].rejected(fakeError);
        } catch (_) {}

        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(window.location.href).toBe('/login');
    })

    it('does not redirect on other errors (500)', async () => {
        const fakeError = { response: { status: 500 }, config: {} };

        try {
            await api.interceptors.response.handlers[0].rejected(fakeError);
        } catch (_) {}

        expect(localStorage.removeItem).not.toHaveBeenCalled();
        expect(window.location.href).toBe('');
    })
})
