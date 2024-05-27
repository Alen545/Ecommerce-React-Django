import React, { useState } from "react";
import UserNavBar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Checkoutpage() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get("Token");
  const decoded = jwtDecode(token);

  const formData = new FormData();
  formData.append("address", address);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://127.0.0.1:8000/api/checkaddress/${decoded.user_id}`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        navigate("/orderconfirm");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <UserNavBar />

      <form onSubmit={handlesubmit} className="max-w-4xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Enter Shipping Address:
            </label>
            <input
              type="text"
              placeholder="Full address"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">Select a Payment Method</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center mb-2">
                <input type="radio" name="paymentMethod" className="mr-2" />
                <label className="text-lg font-medium">
                  Credit & Debit Cards
                </label>
              </div>
              <p className="text-gray-600">Pay with credit or debit card</p>
            </div>

            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center mb-2">
                <input type="radio" name="paymentMethod" className="mr-2" />
                <label className="text-lg font-medium">UPI</label>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" name="upiMethod" className="mr-2" />
                  <p className="text-gray-600">Other UPI Apps</p>
                </div>
                <hr />
                <div className="flex items-center text-blue-600 cursor-pointer">
                  <FaCirclePlus className="mr-2" />
                  <p>Add Account</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-300 rounded-lg">
              <label className="block text-lg font-medium mb-2">
                More Ways to Pay
              </label>
              <hr />
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" name="paymentMethod" className="mr-2" />
                  <p className="text-gray-600">Amazon Pay Later</p>
                </div>
                <hr />
                <div className="flex items-center">
                  <input type="radio" name="paymentMethod" className="mr-2" />
                  <p className="text-gray-600">EMI</p>
                </div>
                <hr />
                <div className="flex items-center">
                  <input type="radio" name="paymentMethod" className="mr-2" />
                  <p className="text-gray-600">Net Banking</p>
                </div>
                <hr />
                <div className="flex items-center">
                  <input type="radio" name="paymentMethod" className="mr-2" />
                  <p className="text-gray-600">Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <GuestFooter />
    </div>
  );
}

export default Checkoutpage;
