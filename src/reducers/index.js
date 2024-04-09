import { combineReducers } from "redux";
import Reducer from "./Reducer";
import cartReducer from "./cartReducer";
// Combine all your reducers
export default combineReducers({
  generalState: Reducer,
  cartState: cartReducer,
});
