import bookmarkAction from "../actions/bookmarkAction";
const initialState = {
  bookmarks: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case bookmarkAction.types.GET_BOOKMARKS:
      return { ...state, bookmarks: action?.payload };
    case bookmarkAction.types.SET_IS_LOADING:
      return { ...state, isLoading: action?.payload };
    default:
      return state;
  }
};
