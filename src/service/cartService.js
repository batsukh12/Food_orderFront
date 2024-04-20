import axios from "axios";
import ApiConfig from "../config";
import { getToken } from "../Store";

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

const getCartItems = async () => {
  console.log(`CartService | getCartItems`);
  try {
    let response = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Cart}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Cart data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Cart data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Cart data not found`,
    };
  }
};

const addToCart = async ({ foodId, userId }) => {
  console.log(foodId + " " + userId);
  console.log(`CartService | addToCart`);
  try {
    let response = await axios.post(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Cart}/${foodId}`,
      { userId }, // Include userId in the request body
      {
        headers: authHeader(getToken()),
      }
    );
    console.log(response?.data);
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to cart failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};

const removeFromCart = async ({ foodId }) => {
  console.log(`CartService | removeFromCart`);
  try {
    let response = await axios.delete(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Cart}/${foodId}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item removed from cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item removed from failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Item removed from failed`,
    };
  }
};

export default { getCartItems, addToCart, removeFromCart };
