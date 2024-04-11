import axios from "axios";
import ApiConfig from "../config";
import { getToken } from "../Store";
const authHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getBookmark = async (userId) => {
  console.log(`bookmark | getmark`);
  try {
    let response = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Bookmark}/${userId}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `bookmark data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `bookmark data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `bookmark data not found`,
    };
  }
};

const addbookmark = async ({ restaurantId, userId }) => {
  console.log(`bookmark | addbookmark`);
  try {
    let response = await axios.post(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Bookmark}/${restaurantId}`,
      { userId }, // Include userId in the request body
      {
        headers: authHeader(getToken()),
      }
    );
    console.log(response?.data);
    if (response?.status === 200) {
      return {
        status: true,
        message: `bookmark added successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `bookmark added failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `bookmark add failed`,
    };
  }
};

const removeBookmark = async ({ restaurantId, userId }) => {
  console.log(`bookmark | removeMark`);
  try {
    let response = await axios.delete(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Cart}/${restaurantId}`,
      { userId }, // Include userId in the request body

      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `bookmark removed successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `bookmark removed failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `bookmark removed failed`,
    };
  }
};

export default { getBookmark, addbookmark, removeBookmark };
