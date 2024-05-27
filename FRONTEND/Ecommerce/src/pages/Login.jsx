import React, { useState } from "react";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const data = {
    username: username,
    password: password,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((res) => {
        Cookies.set("Token", res.data["token"]);
        setUsername("");
        setPassword("");

        // Decode the JWT token
        const decoded = jwtDecode(res.data["token"]);
        // Check if the user is a superuser and redirect accordingly
        if (decoded.superuser === true) {
          navigate("/Admin");
        } else {
          navigate("/User");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GuestNavBar />
      <div className="container mx-auto flex-grow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={submitHandler} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <GuestFooter />
    </div>
  );
}

export default Login;
