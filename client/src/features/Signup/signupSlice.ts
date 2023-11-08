import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SignupState, RaceSignup } from './types';

const initialState: SignupState = {
    slots: {},
    loading: false,
    error: null,
};

export const fetchSignups = createAsyncThunk(
    'kart/schedule',
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await fetch('/kart/schedule');
            console.log('response', response);
            if (!response.ok) throw new Error('Network response was not ok');
            const data: RaceSignup[] = await response.json();
            console.log('this is the data returned in fetchSignups', data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        // blank for now
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchSignups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSignups.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach((signup) => {
                    if(state.slots[signup.raceId]){
                        state.slots[signup.raceId].push(signup.userId);
                    } else {
                        state.slots[signup.raceId] = [signup.userId];
                    }
                })
            })
            .addCase(fetchSignups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const {} = signupSlice.actions;

export const selectSignups = (state: RootState) => state.signups;

export default signupSlice.reducer;