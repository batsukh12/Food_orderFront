import { combineReducers } from "redux";
import Reducer from "./Reducer";

// Combine all your reducers
const root = combineReducers({
  generalState: Reducer,
});

export default root;
