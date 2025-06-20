import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { loginApi } from '../api/authApi';
import type { User, Credentials } from '../domain/types';

export type AuthState = {
    user: User | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
};

export const login = createAsyncThunk<
    { user: User; token: string },
    Credentials
>('auth/login', async (credentials) => {
    const response = await loginApi(credentials);
    localStorage.setItem('token', response.token);
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            }
        );
    },
});

export default authSlice.reducer;
