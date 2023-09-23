import React, { useState, useEffect } from "react";
// in your src/index.js or src/index.tsx
import "./../custom.css";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import {
  AGERANGE_TEXT,
  EIGHTIES_TEXT,
  FEMALE_TEXT,
  FIFTIES_TEXT,
  FORTIES_TEXT,
  GENDER_TEXT,
  LOGIN_TEXT,
  MALE_TEXT,
  NICKNAME_TEXT,
  PASSWORDCONFORM_TEXT,
  PASSWORD_TEXT,
  SEVENTIES_TEXT,
  SIGNUP_TEXT,
  SIXTIES_TEXT,
  TEENS_TEXT,
  THIRTIES_TEXT,
  TWENTIES_TEXT,
  USERID_TEXT,
  VALIDITYTESTFAIL_TEXT,
  VALIDITYTESTSUCESS_TEXT,
  VALIDITYTEST_TEXT,
} from "../data/constants";
import { SingUp, UserCheck } from "../api/signup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");
  const mutation = useMutation(SingUp);
  const userCheckMutation = useMutation(UserCheck);

  const navigate = useNavigate();

  useEffect(() => {
    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setPasswordError(VALIDITYTEST_TEXT);
    } else {
      setPasswordError("");
    }

    // 비밀번호 확인 유효성 검사
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordStatus({
          color: "red",
          message: VALIDITYTESTFAIL_TEXT,
        });
      } else {
        setConfirmPasswordStatus({
          color: "green",
          message: VALIDITYTESTSUCESS_TEXT,
        });
      }
    } else {
      setConfirmPasswordStatus("");
    }
  }, [password, confirmPassword]);

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    try {
      const response = await mutation.mutateAsync({
        username, // Pass username and password to the API
        password,
        ageRange,
        nickname,
        gender,
      });

      if (response.message === "회원가입 성공") {
        navigate("/"); // 이동
      } else {
        console.error("Failed to signup");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUserCheck = async (username) => {
    try {
      const response = await userCheckMutation.mutateAsync({
        username, // Pass username and password to the API
      });
      console.log(response);
      if (response.isvalid === true) {
        alert("중복된 아이디가 아닙니다.");
      } else {
        console.error("Failed to signup");
        alert("중복된 아이디입니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="hidden-scrollbar">
      <div className="w-screen h-screen flex justify-center items-center border-color">
        {/* Outer Card */}
        <div className="w-11/12 max-w-3xl p-6 bg-white border-2 border-black rounded-xl shadow-2xl flex flex-col justify-center items-center">
          {/* Inner Content */}
          <h1 className="text-2xl font-semibold mb-4 text-center">
            {SIGNUP_TEXT}
          </h1>
          <form className="w-full" onSubmit={handleSignUp}>
            {/* UserID */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
                {USERID_TEXT}
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="p-2 flex-grow border rounded-md mr-2" // 'flex-grow'로 인풋창이 더 넓게 조절됩니다.
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update username state whenever the input value changes
                />
                <button
                  type="button"
                  className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  onClick={() => handleUserCheck(username)} // 'username'을 객체로 감싸지 않습니다.
                >
                  중복확인
                </button>
              </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full border rounded-md"
              />
              {passwordError && (
                <p className="text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
            {/* Password Confirm */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                {PASSWORDCONFORM_TEXT}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 w-full border rounded-md"
              />
              {confirmPasswordStatus && (
                <p
                  className={`${
                    confirmPasswordStatus.color === "green"
                      ? "text-green-500"
                      : "text-red-500"
                  } mt-1`}
                >
                  {confirmPasswordStatus.message}
                </p>
              )}
            </div>
            {/* Nickname */}
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium mb-2"
              >
                {NICKNAME_TEXT}
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="p-2 w-full border rounded-md"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                {AGERANGE_TEXT}
              </label>
              <select
                id="ageRange"
                name="ageRange"
                onChange={(e) => setAgeRange(e.target.value)}
                value={ageRange}
                className="p-2 w-full border rounded-md"
              >
                <option value="10">{TEENS_TEXT}</option>
                <option value="20">{TWENTIES_TEXT}</option>
                <option value="30">{THIRTIES_TEXT}</option>
                <option value="40">{FORTIES_TEXT}</option>
                <option value="50">{FIFTIES_TEXT}</option>
                <option value="60">{SIXTIES_TEXT}</option>
                <option value="70">{SEVENTIES_TEXT}</option>
                <option value="80">{EIGHTIES_TEXT}</option>
              </select>
            </div>
            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-2"
              >
                {GENDER_TEXT}
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="p-2 w-full border rounded-md"
              >
                <option value="male">{MALE_TEXT}</option>
                <option value="female">{FEMALE_TEXT}</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="text-black px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {SIGNUP_TEXT}
              </button>
              <Link to="/" className="text-blue-500 hover:underline">
                {LOGIN_TEXT}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
