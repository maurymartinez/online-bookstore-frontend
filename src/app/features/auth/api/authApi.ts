import type { Credentials } from '../domain/types';

export const loginApi = async (
    credentials: Credentials
): Promise<{ user: { email: string }; token: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
        user: { email: credentials.email },
        token: 'fake-token',
    };
};
