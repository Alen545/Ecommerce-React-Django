import React from "react";
import { useNavigate } from "react-router-dom";
function GuestNavBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center">
        <span className="text-white font-bold text-xl">Alen's Store</span>
      </div>
      <div className="hidden md:flex">
        <button
          onClick={() => navigate("/")}
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/Login")}
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/Register")}
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Sign Up
        </button>
      </div>
      <div className="md:hidden">
          <button type="button" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Menu
          </button>
        </div>
    </nav>
  );
}

export default GuestNavBar;
