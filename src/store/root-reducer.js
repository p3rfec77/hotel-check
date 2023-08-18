import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user.slice";
import hotelsSlice from "./hotels.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  hotels: hotelsSlice,
});
