import ApiConfig from "../config";
import axios from "axios";
import { getToken } from "../Store";

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

const getUserData = async (userId) => {
  console.log(`UserService | getUserData`);
  try {
    let userResponse = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.User}/${userId}`,
      {
        headers: authHeader(getToken()),
      }
    );

    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `User data fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `User data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `User data not found`,
    };
  }
};

export default { getUserData };
