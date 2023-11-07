// client/src/app/rootReducers.ts

import { combineReducers } from '@reduxjs/toolkit';
import signupReducer from '../features/Signup/signupSlice';

const rootReducer = combineReducers({
  // other reducers here
  signups: signupReducer,
});

export default rootReducer;
