import { StorageService, authService, userService } from "../service";
import bookmarkAction from "./bookmarkAction";
import cartAction from "./cartAction";

const types = {
  SET_APP_LOADING: "SET_APP_LOADING",
  SET_TOKEN: "SET_TOKEN",
  SET_FIRST_USE: "SET_FIRST_USE",
  SET_USER_DATA: "SET_USER_DATA",
};
const setLoading = (isLoading) => {
  return {
    type: types.SET_APP_LOADING,
    payload: isLoading,
  };
};
const setToken = (token) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};
const setFirstUse = () => {
  return {
    type: types.SET_FIRST_USE,
    payload: false,
  };
};
const userId = "";

const setUserData = (userData) => {
  userId = userData;
  return {
    type: types.SET_USER_DATA,
    payload: userData,
  };
};
const appStart = () => {
  return (dispatch, getState) => {
    StorageService.getFirstUse().then((isFirstTimeUse) => {
      dispatch({
        type: types.SET_FIRST_USE,
        payload: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then((token) => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        });
        userService.getUserData(userId).then((userResponse) => {
          if (userResponse?.status) {
            dispatch({
              type: types.SET_USER_DATA,
              payload: userResponse?.userId,
            });
            // dispatch(cartAction.getCartItems(userId));
            // dispatch(bookmarkAction.getBookmarks({ userId }));
            dispatch({
              type: types.SET_APP_LOADING,
              payload: false,
            });
          } else if (userResponse?.message === "TokenExpiredError") {
            authService.refreshToken().then((tokenResponse) => {
              if (tokenResponse?.status) {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: tokenResponse?.data,
                });
                userService.getUserData(userId).then((userResponse) => {
                  if (userResponse?.status) {
                    dispatch({
                      type: types.SET_USER_DATA,
                      payload: userResponse?.data,
                    });
                    dispatch({
                      type: types.SET_APP_LOADING,
                      payload: false,
                    });
                  }
                });
              } else {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: "",
                });
                dispatch({
                  type: types.SET_APP_LOADING,
                  payload: false,
                });
              }
            });
          }
        });
      }
      dispatch({
        type: types.SET_APP_LOADING,
        payload: false,
      });
    });
  };
};
export default {
  setLoading,
  setToken,
  types,
  appStart,
  setFirstUse,
  setUserData,
};
