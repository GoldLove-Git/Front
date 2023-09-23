import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import {
  LOGIN_TEXT,
  PASSWORD_TEXT,
  SIGNUP_TEXT,
  USERID_TEXT,
} from "../data/constants";
import { Login } from "../api/login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation(Login);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    try {
      const response = await mutation.mutateAsync({
        username, // Pass username and password to the API
        password,
      });
      console.log(response);
      if (response.message !== "로그인 실패") {
        console.log(response);
        navigate("/mainpage"); // 이동
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center border-color">
      {/* ... rest of your code */}
      <div className="w-11/12 max-w-3xl p-6 bg-white border-2 border-black rounded-xl shadow-2xl flex flex-col justify-center items-center">
        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              {USERID_TEXT}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="p-2 w-full border rounded-md"
              placeholder="Enter your user ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state whenever the input value changes
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              {PASSWORD_TEXT}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 w-full border rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state whenever the input value changes
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit" // Change the button type to submit to trigger the form submission
              className="text-black px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {LOGIN_TEXT}
            </button>

            <Link to="/signup" className="text-blue-500 hover:underline">
              {SIGNUP_TEXT}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
