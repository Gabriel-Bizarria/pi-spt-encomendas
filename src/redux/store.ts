import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer } from "./reducers/navReducer";
import ordersSlice from "./slices/ordersSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  orders: ordersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
