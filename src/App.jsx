import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import MainPage from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "mainpage", element: <MainPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "mypage", element: <Mypage /> },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
