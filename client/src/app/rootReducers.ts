// client/src/app/rootReducers.ts

import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from '../features/Signup/signupSlice';
import leaderboardSlice from './leaderboardSlice';

const rootReducer = combineReducers({
  // other reducers here
  signups: signupReducer,
  leaderboard: leaderboardSlice
});

export default rootReducer;
