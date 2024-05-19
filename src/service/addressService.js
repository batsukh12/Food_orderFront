import axios from "axios";
import ApiConfig from "../config";
import { getToken } from "../Store";

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

const getAddress = async (userId) => {
  console.log(userId);
  console.log(`AddressService | get`);
  try {
    let response = await axios.get(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Address}`,
      {
        params: {
          userId: userId,
        },
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `address data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `address data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `address data not found`,
    };
  }
};

const addAddress = async ({ address, userId }) => {
  console.log(address);
  console.log(`AddressService | add`);
  try {
    let response = await axios.post(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Address}`,
      { address, userId },
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to address successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to address failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to address failed`,
    };
  }
};

const deleteAddress = async ({ addressId }) => {
  console.log(addressId);
  console.log(`AddressService | delete`);
  try {
    let response = await axios.delete(
      `${ApiConfig.backend_api.baseUrl}${ApiConfig.backend_api.Address}/${addressId}`,
      {
        headers: authHeader(getToken()),
      }
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: ` delete address successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item delete to address failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item delete to address failed`,
    };
  }
};

export default { getAddress, addAddress, deleteAddress };
