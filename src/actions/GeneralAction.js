import { StorageService } from "../service";

const types = {
  SET_APP_LOADING: "SET_APP_LOADING",
  SET_TOKEN: "SET_TOKEN",
  SET_FIRST_USE: "SET_FIRST_USE",
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
      }
      dispatch({
        type: types.SET_APP_LOADING,
        payload: false,
      });
    });
  };
};
export default { setLoading, setToken, types, appStart, setFirstUse };
