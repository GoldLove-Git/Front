const URL = import.meta.env.VITE_REACT_APP_URL;
import axios from "axios";

export const SingUp = async ({
  username,
  password,
  nickname,
  ageRange,
  gender,
}) => {
  try {
    const response = await axios.post(`${URL}/users/signup`, {
      userId: username,
      password: password,
      nickname: nickname,
      ageRange: ageRange,
      gender: gender,
    });
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

export const UserCheck = async ({ username }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_URL}/users/id/check`,
      {
        userId: username,
      }
    );
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
