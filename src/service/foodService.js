import axios from "axios";
import ApiConfig from "../config";
import { getToken } from "../Store";
const authHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getFoodById = async (foodId) => {
  console.log(`CartService | getFood`);
  try {
    let response = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Food}/${foodId}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `food data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `food data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `food data not found`,
    };
  }
};

export default { getFoodById };
