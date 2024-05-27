import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";

const RegisterVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const userid = Cookies.get("userid");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/api/verifyotp/${userid}/`, { otp: otp })
      .then((res) => {
        console.log(res.data);
        setOtp("");
        navigate("/Register/Password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <GuestNavBar />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Enter OTP</h2>
        <form onSubmit={submitHandler} className="max-w-md mx-auto">
          <label htmlFor="otp" className="block mb-2">
            OTP Code
          </label>
          <input
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Enter OTP"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <GuestFooter />
    </div>
  );
};

export default RegisterVerification;
