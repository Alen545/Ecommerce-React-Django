import React, { useState } from "react";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {
  const [registerdata, setRegisterdata] = useState({
    username: "",
    email: "",
    location: "",
    phone_no: "",
  });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", registerdata)
      .then((res) => {
        console.log(res.data);
        Cookies.set("userid", res.data["user"]); // res.data["user"] contains the user ID from Backend

        setRegisterdata({
          username: "",
          email: "",
          location: "",
          phone_no: "",
        });

        navigate("/RegisterVerification");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <GuestNavBar />
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
        <form onSubmit={submitHandler} className="max-w-lg w-full px-4">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerdata.username}
              onChange={(e) =>
                setRegisterdata({ ...registerdata, username: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerdata.email}
              onChange={(e) =>
                setRegisterdata({ ...registerdata, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={registerdata.location}
              onChange={(e) =>
                setRegisterdata({ ...registerdata, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={registerdata.phone_no}
              onChange={(e) =>
                setRegisterdata({ ...registerdata, phone_no: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
          >
            Register
          </button>
        </form>
      </div>
      <GuestFooter />
    </div>
  );
}

export default Register;
