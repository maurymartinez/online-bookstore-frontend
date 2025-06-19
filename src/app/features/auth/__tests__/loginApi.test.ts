import { describe, it, expect, vi } from 'vitest'
import { loginApi } from '../api/authApi'
import { api } from '../../../shared/api/axios'
import type { Credentials } from '../domain/types'

vi.mock('../../../shared/api/axios', () => {
    return {
        api: {
            post: vi.fn()
        }
    }
})

describe('loginApi', () => {
    it('calls POST /auth/login with credentials and returns user + token', async () => {
        const credentials: Credentials = {
            email: 'test@example.com',
            password: '123456'
        }

        const mockResponse = {
            data:{
                access_token: 'real-token',
            }
        };

        (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse)

        const result = await loginApi(credentials)

        expect(api.post).toHaveBeenCalledWith('/auth/login', credentials)
        expect(result).toEqual({ token: 'real-token' })
    })
})
