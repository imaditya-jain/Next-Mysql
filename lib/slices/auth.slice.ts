import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
import { registrationHandler } from '../features/auth.features'

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}

interface AuthData {
    user: User;
}

interface RejectError {
    success: boolean;
    error: string;
}

interface InitialStateTypes {
    user: User | null;
    loading: boolean;
    error: string;
    message: string;
    isAuthenticated: boolean;
    initialized: boolean;
}

const initialState: InitialStateTypes = {
    user: null,
    loading: false,
    error: "",
    message: "",
    isAuthenticated: false,
    initialized: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setPending: (state) => {
            state.loading = true;
            state.error = "";
            state.message = "";
        },
        setFulfilled: (state, action: PayloadAction<ApiResponse<AuthData>>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.initialized = true;
            if (action.payload?.data?.user) {
                state.user = action.payload.data.user;
            }
        },
        setRejected: (state, action: PayloadAction<RejectError | undefined>) => {
            state.loading = false;
            state.error = action.payload?.error || "Something went wrong.";
            state.isAuthenticated = false;
            state.initialized = true;
        },
        setLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registrationHandler.pending, (state) => authSlice.caseReducers.setPending(state));
        builder.addCase(registrationHandler.fulfilled, (state, action) => authSlice.caseReducers.setFulfilled(state, action));
        builder.addCase(registrationHandler.rejected, (state, action) => authSlice.caseReducers.setRejected(state, action));

    }
});