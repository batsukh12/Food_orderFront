import { combineReducers } from "redux";
import Reducer from "./Reducer";
import cartReducer from "./cartReducer";
import bookmarkReducer from "./bookmarkReducer";

export default combineReducers({
  generalState: Reducer,
  cartState: cartReducer,
  bookmarkState: bookmarkReducer,
});
