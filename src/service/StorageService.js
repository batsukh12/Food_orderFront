import AsyncStorage from "@react-native-async-storage/async-storage";

const setFirstUse = () => {
  return AsyncStorage.setItem("isFirstUse", "true");
};

const getFirstUse = () => {
  return AsyncStorage.getItem("isFirstUse");
};
const setToken = (token) => {
  return AsyncStorage.setItem("token", token);
};
const getToken = () => {
  return AsyncStorage.getItem("token");
};
export default { setFirstUse, getFirstUse, setToken, getToken };
