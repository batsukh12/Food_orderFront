import { cartAction } from "../actions";
const initialState = {
  cart: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cartAction.types.GET_CART_ITEMS:
      return { ...state, cart: action?.payload };
    case cartAction.types.SET_IS_LOADING:
      return { ...state, isLoading: action?.payload };
    default:
      return state;
  }
};
