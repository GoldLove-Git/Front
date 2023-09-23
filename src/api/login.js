const URL = import.meta.env.VITE_REACT_APP_URL;
import axios from "axios";

export const Login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${URL}/users/login`, {
      user_id: username,
      password: password,
    });
    // localStorage에 username 저장
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
  }
};
