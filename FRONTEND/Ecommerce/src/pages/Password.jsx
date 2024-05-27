import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";
import { useNavigate } from "react-router-dom";

function Password() {
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [incorrect, setIncorrect] = useState();

  const userid = Cookies.get("userid");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setIncorrect(false);
    axios
      .post(`http://127.0.0.1:8000/api/password/${userid}/`, {
        password: password,//key:value pair
        cpassword: cpassword,
      })
      .then((res) => {
        console.log(res.data);
        setPassword("");
        setCpassword("");
        setIncorrect(false);
        navigate("/Login");
      })
      .catch((error) => {
        setIncorrect(true);
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GuestNavBar />
      <div className="container mx-auto flex-grow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Hey Buddy Set Your Password</h2>
        <form onSubmit={submitHandler} className="max-w-md mx-auto">
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <GuestFooter />
    </div>
  );
}

export default Password;
