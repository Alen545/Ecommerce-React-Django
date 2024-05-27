import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { VscListUnordered } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserNavbar = () => {
  const [searchdata, setSearchdata] = useState("");
  const [products,setProducts] = useState('')
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/productlist/?searchdata=${searchdata}`)
      .then(response => {
        setProducts(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/User")}>
        <span className="text-white mr-4 font-semibold">Alen's Store</span>
      </div>

      <div className="flex-grow mx-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchdata}
            onChange={(e) => setSearchdata(e.target.value)}
            className="w-full py-2 px-4 rounded-l bg-gray-700 text-white"
          />
          <button type="submit" className="bg-gray-700 text-white py-2 px-4 rounded-r">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <FiShoppingCart className="h-6 w-6 text-white cursor-pointer" onClick={() => navigate("/Cart")} />
        <VscListUnordered className="h-6 w-6 text-white cursor-pointer" onClick={() => navigate("/listorder")} />
        <CgProfile className="h-6 w-6 text-white cursor-pointer" onClick={() => navigate("/Profile")} />
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          onClick={() => navigate("/Login")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
