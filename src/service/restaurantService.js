import axios from "axios";
import ApiConfig from "../config";
import { getToken } from "../Store";

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

const getRestaurants = async () => {
  console.log(`RestaurantsService | getRestaurants`);
  try {
    let restaurantResponse = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Restaurant}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return {
      status: false,
      message: `Error fetching restaurants: ${error.message}`,
    };
  }
};

const getRestaurantById = async (restaurantId) => {
  console.log(`RestaurantsService | getOneRestaurantById`);
  try {
    let restaurantResponse = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Restaurant}/${restaurantId}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    return {
      status: false,
      message: `Error fetching restaurant by ID: ${error.message}`,
    };
  }
};

export default { getRestaurants, getRestaurantById };
