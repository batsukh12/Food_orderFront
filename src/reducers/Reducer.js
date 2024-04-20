import { GeneralAction } from "../actions";

const initialState = {
  isLoading: true,
  token: "",
  isFirstUse: true,
  userData: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GeneralAction.types.SET_APP_LOADING:
      return { ...state, isLoading: action.payload };
    case GeneralAction.types.SET_TOKEN:
      return { ...state, token: action.payload };
    case GeneralAction.types.SET_FIRST_USE:
      return { ...state, isFirstUse: action.payload };
    case GeneralAction.types.SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default Reducer;
