import { BASE_URL } from "../../constants/BASE_URL";
import axios from "axios";

console.log(BASE_URL);

export const checkLoggedIn = async () => {
  // check if user is logged in or not
  try {
    const temp = axios.get(`${BASE_URL}/auth/checkLogin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};

export const Login = async (email: string, password: string) => {
  try {
    const temp = axios.post(
      `${BASE_URL}/auth/login`,
      { email: email, password: password },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const res = await temp;
    return Promise.resolve({ status: 200, data: res.data });
  } catch (error) {
    return Promise.resolve({ status: 401, data: error });
  }
};
