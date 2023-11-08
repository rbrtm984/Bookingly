import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SignupState, RaceSignup } from './types';

/**
 * {
    "lunch": {
        "slot1": [
            "angry_banana",
            "invincible_katya",
            "mushroom_mushroom"
        ],
        "slot3": [
            "monkey",
            "invincible_katya"
        ]
    },
    "dinner": {
        "slot3": [
            "angry_banana",
            "invincible_katya",
            "mushroom_mushroom"
        ]
    },
    "evening": {
        "slot2": [
            "mushroom_mushroom",
            "angry_banana",
            "very_angry_banana"
        ],
        "slot4": [
            "very_angry_banana",
            "invincible_katya",
            "monkey"
        ]
    }
}
 */

const initialState: SignupState = {
    time: {},
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

export const signupForRace = createAsyncThunk(
    'kart/signup',
    async ({ race, username }: { race: string, username: string }, { rejectWithValue }) => {
        try {
            const body = { race, username };
            const response = await fetch(`/kart/schedule/${timeId}/${slotId}/${racerId}`, { method: 'POST' });
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
                const payload = action.payload as RaceSignup;
                // console.log('payload', payload)
                Object.entries(payload).forEach(([timeId, slots]) => {
                    const timeKey = timeId as string;
                    // console.log('timeKey', timeKey);
                    // console.log('slots', slots);
                    // Make sure we initialize the time in state if it doesn't exist
                    if (!state.time[timeKey]) {
                        state.time[timeKey] = {};
                    }
                    // Now we can push races into the corresponding slot
                    // We use concat to avoid mutating the state directly
                    Object.entries(slots).forEach(([slotId, racerIds], index) => {
                        // console.log('slotId', slotId);
                        // console.log('racerIds', racerIds);
                        // console.log('state.time', state.time)
                        // console.log('state.time[timeId]', state.time[timeId])
                        state.time[timeKey][slotId] = racerIds;
                    })
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