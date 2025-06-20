import type { Credentials } from '../domain/types';
import { api } from '../../../shared/api/axios';

export const loginApi = async (
    credentials: Credentials
): Promise<{ token: string }> => {
    const response = await api.post('/auth/login', credentials);
    return {
        token: response.data.access_token,
    };
}

export const registerApi = async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    if (response.status !== 201) throw new Error('Registration failed');
}
