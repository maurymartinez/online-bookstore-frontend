import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerApi } from '../api/authApi';
import { api } from '../../../shared/api/axios';

vi.mock('../../../shared/api/axios', () => ({
    api: {
        post: vi.fn(),
    },
}))

describe('registerApi', () => {
    const mockData = {
        name: 'Alice',
        email: 'alice@example.com',
        password: '123456',
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('calls POST /auth/register with user data', async () => {
        (api.post as any).mockResolvedValue({ status: 201 });

        await registerApi(mockData);

        expect(api.post).toHaveBeenCalledWith('/auth/register', mockData);
    })

    it('throws error if status is not 201', async () => {
        (api.post as any).mockResolvedValue({ status: 400 });

        await expect(registerApi(mockData)).rejects.toThrow('Registration failed');
    })
})
