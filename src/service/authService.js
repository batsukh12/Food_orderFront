import axios from "axios";
import ApiConfig from "../config";
const AuthRequest = axios.create({
  baseURL: ApiConfig.backend_api.baseUrl,
});
const Register = async (user) => {
  if (!user.username || !user?.email || !user.password) {
    return { status: false, message: "Бүх талбарыг бөглөн үү. " };
  }
  try {
    let reqBody = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    let response = await AuthRequest.post(
      ApiConfig.backend_api.Register,
      reqBody
    );
    return response?.data;
  } catch (err) {
    console.log(err);
    return { status: false, message: "Oops! something went wrong." };
  }
};
const Login = async (user) => {
  if (!user?.email || !user.password) {
    return { status: false, message: "Бүх талбарыг бөглөн үү. " };
  }
  try {
    let reqBody = {
      email: user.email,
      password: user.password,
    };

    let response = await AuthRequest.post(ApiConfig.backend_api.Login, reqBody);
    return response?.data;
  } catch (err) {
    console.log(err);
    return { status: false, message: "Oops! something went wrong." };
  }
};
export default { Register, Login };
