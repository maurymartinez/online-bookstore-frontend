import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBooksApi } from '../api/booksApi';
import type { Book } from '../domain/types';

type BooksState = {
    items: Book[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BooksState = {
    items: [],
    status: 'idle',
    error: null,
}

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
    return await fetchBooksApi();
})

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Error fetching books'
            })
    },
})

export default booksSlice.reducer;
