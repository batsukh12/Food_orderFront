import { bookmarkService } from "../service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const types = {
  GET_BOOKMARKS: "GET_BOOKMARKS",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const addBookmark = ({ restaurantId, userId, restaurant }) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    try {
      let bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks")) || [];

      const newBookmark = {
        restaurantId,
        userId,
        name: restaurant.name,
        images: restaurant.images,
        location: restaurant.location,
        tags: restaurant.tags,
      };

      bookmarks.push(newBookmark);

      await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));

      dispatch({
        type: types.GET_BOOKMARKS,
        payload: bookmarks,
      });

      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    } catch (error) {
      console.error("Error while adding bookmark:", error);
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
  };
};

const removeBookmark = ({ restaurantId, userId }) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });

    try {
      let bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks")) || [];
      const updatedBookmarks = bookmarks.filter(
        (bookmark) =>
          bookmark.restaurantId !== restaurantId || bookmark.userId !== userId
      );

      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

      dispatch({
        type: types.GET_BOOKMARKS,
        payload: updatedBookmarks,
      });

      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    } catch (error) {
      console.error("Error while removing bookmark:", error);
      dispatch({
        type: types.SET_IS_LOADING,
        payload: false,
      });
    }
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
