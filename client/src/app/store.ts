import { configureStore } from '@reduxjs/toolkit'
import leaderboardReducer from './leaderboardSlice';

const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;