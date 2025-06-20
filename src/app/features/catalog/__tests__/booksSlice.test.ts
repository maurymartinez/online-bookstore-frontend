import { describe, it, expect } from 'vitest';
import booksReducer, { fetchBooks } from '../slices/booksSlice';
import type { Book } from '../domain/types';

describe('booksSlice', () => {
    const initialState = {
        items: [],
        status: 'idle',
        error: null,
    }

    it('should set status to "loading" when fetchBooks is pending', () => {
        const action = { type: fetchBooks.pending.type };
        const state = booksReducer(initialState, action);
        expect(state.status).toBe('loading');
        expect(state.items).toEqual([]);
    })

    it('should store books and set status to "succeeded" when fetchBooks is fulfilled', () => {
        const mockBooks: Book[] = [
            { id: 1, title: 'Book A', author: 'Author A', price: 10 },
            { id: 2, title: 'Book B', author: 'Author B', price: 15 },
        ];
        const action = {
            type: fetchBooks.fulfilled.type,
            payload: mockBooks,
        };
        const state = booksReducer(initialState, action);
        expect(state.status).toBe('succeeded');
        expect(state.items).toEqual(mockBooks);
    })

    it('should set status to "failed" and store error message when fetchBooks is rejected', () => {
        const action = {
            type: fetchBooks.rejected.type,
            error: { message: 'Network error' },
        };
        const state = booksReducer(initialState, action);
        expect(state.status).toBe('failed');
        expect(state.error).toBe('Network error');
    })
})
