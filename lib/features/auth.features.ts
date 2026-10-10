import {createAsyncThunk} from '@reduxjs/toolkit'
import { User } from '@/types'

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    emailSent?: boolean;
    data?: {
        user: User
    }
}

interface RejectError {
    success: boolean,
    error: string
}

export const registrationHandler = createAsyncThunk<ApiResponse, Record<string, unknown>,{ rejectValue: RejectError }>('auth/registration', async (data,{rejectWithValue}) => {
    try{
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: ApiResponse = await response.json()

        if (!response.ok) {
            return rejectWithValue({
                success: false,
                error: result?.error || 'Something went wrong.',
            })
        }

        return result

    }catch(error){
        if (error instanceof Error) {
            return rejectWithValue({ success: false, error: error.message })
        }

        return rejectWithValue({ success: false, error: 'Something went wrong.' })
    }
})

export const resendVerificationHandler = createAsyncThunk<ApiResponse, { email: string },{ rejectValue: RejectError }>('auth/resendVerification', async (data,{rejectWithValue}) => {
    try{
        const response = await fetch('/api/v1/auth/resend-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result: ApiResponse = await response.json()

        if (!response.ok) {
            return rejectWithValue({
                success: false,
                error: result?.error || 'Something went wrong.',
            })
        }

        return result

    }catch(error){
        if (error instanceof Error) {
            return rejectWithValue({ success: false, error: error.message })
        }

        return rejectWithValue({ success: false, error: 'Something went wrong.' })
    }
})