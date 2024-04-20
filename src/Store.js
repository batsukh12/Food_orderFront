import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import root from "./reducers";

const store = configureStore({
  reducer: root,
});
const getToken = () => store?.getState()?.generalState?.token;

export { store, getToken };
