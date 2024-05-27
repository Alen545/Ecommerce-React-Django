import React from "react";
import UserNavbar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function OrderConfirm() {
  const token = Cookies.get("Token");
  const decoded = jwtDecode(token);

  const navigate = useNavigate();

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-4">
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">Order Confirmed</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-xl">Hello, {decoded.username}</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg">
              Thank you for shopping with us! We'll send a confirmation when
              your item ships.
            </h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Details</h3>
            <h5>
              Order# <span className="font-mono">112-50562198-4093619</span>
            </h5>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Arriving</h2>
            <h3 className="text-lg">Thursday May 10</h3>
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => navigate("/listorder")}
            >
              View Order
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-lg">We hope to see you again soon...</h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 mt-8">
        <div className="text-center">
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Conditions of Use
          </a>
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Privacy Notice
          </a>
          <a href="#" className="text-blue-500 hover:underline mx-2">
            Your Ads Privacy Choices
          </a>
        </div>
      </div>
      <GuestFooter />
    </div>
  );
}

export default OrderConfirm;
