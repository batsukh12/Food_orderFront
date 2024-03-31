import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import root from "./reducers"; // Import the combined root reducer

// Create the Redux store with the combined root reducer
export const store = configureStore({
  reducer: root,
  // middleware: [...getDefaultMiddleware()],
});
export const getToken = () => store?.getState()?.generalState?.token;
