import { bookmarkService } from "../service";
const types = {
  GET_BOOKMARKS: "GET_BOOKMARKS",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const addBookmark = ({ restaurantId, userId }) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    bookmarkService
      .addbookmark({ restaurantId, userId })
      .then((bookmarkResponse) => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const removeBookmark = ({ restaurantId, userId }) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    bookmarkService
      .removeBookmark({ restaurantId, userId })
      .then((bookmarkResponse) => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const getBookmarks = (userId) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    bookmarkService
      .getBookmark(userId)
      .then((bookmarkResponse) => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data,
        });
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

export default { types, addBookmark, removeBookmark, getBookmarks };
