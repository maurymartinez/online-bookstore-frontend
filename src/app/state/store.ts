import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice';
import booksReducer from '../features/catalog/slices/booksSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
