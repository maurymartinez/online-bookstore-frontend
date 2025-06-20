import { describe, it, expect, vi } from 'vitest';
import { fetchBooksApi } from '../api/booksApi';
import { api } from '../../../shared/api/axios';
import type { Book } from '../domain/types';

vi.mock('../../../shared/api/axios', () => ({
    api: {
        get: vi.fn(),
    },
}))

describe('fetchBooksApi', () => {
    it('should fetch and return book data', async () => {
        const mockBooks: Book[] = [
                { id: '1', title: '1984', author: 'George Orwell', price: 12 },
                { id: '2', title: 'Brave New World', author: 'Aldous Huxley', price: 15 },
            ];

        (api.get as any).mockResolvedValueOnce({ data: mockBooks });

        const result = await fetchBooksApi();

        expect(api.get).toHaveBeenCalledWith('/books');
        expect(result).toEqual(mockBooks);
    })
})
