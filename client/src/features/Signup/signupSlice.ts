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
            if (!response.ok) throw new Error('Network response was not ok');
            const data: RaceSignup = await response.json();
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
                const payload = action.payload;
                Object.entries(payload).forEach(([raceId, userIds]) => {
                    // Make sure we initialize the slot if it doesn't exist
                    if (!state.slots[raceId]) {
                        state.slots[raceId] = [];
                    }
                    // Now we can push userIds into the corresponding slot
                    // We use concat to avoid mutating the state directly
                    if (userIds) {
                        for (let slot in userIds) {
                            state.slots[raceId] = state.slots[raceId].concat(userIds[slot])
                        }
                    }
                });
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