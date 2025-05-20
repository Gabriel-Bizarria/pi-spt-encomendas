import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer } from "./reducers/navReducer";
import ordersSlice from "./slices/ordersSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  orders: ordersSlice,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
