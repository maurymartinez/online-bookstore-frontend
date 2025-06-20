import { api } from '../../../shared/api/axios';
import type { Book } from '../domain/types';

export const fetchBooksApi = async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
}
