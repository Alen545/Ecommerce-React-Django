import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSideBar() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Add Company") {
      navigate("/AddCompany");
    } else if (event.target.value === "View Company") {
      navigate("/ViewCompany");
    } else if (event.target.value === "Add Category") {
      navigate("/AddCategory");
    } else if (event.target.value === "View Category") {
      navigate("/ViewCategory");
    } else if (event.target.value === "Add Model") {
      navigate("/AddModel");
    } else if (event.target.value === "View Model") {
      navigate("/ViewModel");
    } else if (event.target.value === "Add Product") {
      navigate("/AddProduct");
    } else if (event.target.value === "View Product") {
      navigate("/ViewProduct");
    } 
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-sm font-medium mb-1"
            onClick={() => navigate("/admin")}
          >
            Admin DashBoard
          </label>
        </div>
        {/* Company Field */}
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company
          </label>
          <select
            id="company"
            name="company"
            className="rounded-md border-gray-600 border bg-gray-700 text-white p-2 w-full"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">---Select---</option>
            <option value="Add Company">Add Company</option>
            <option value="View Company">View Company</option>
          </select>
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="rounded-md border-gray-600 border bg-gray-700 text-white p-2 w-full"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">---Select---</option>
            <option value="Add Category">Add Category</option>
            <option value="View Category">View Category</option>
          </select>
        </div>

        {/* Model Field */}
        {/* <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium mb-1">
            Model
          </label>
          <select
            id="model"
            name="model"
            className="rounded-md border-gray-600 border bg-gray-700 text-white p-2 w-full"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">---Select---</option>
            <option>Add Model</option>
            <option>View Model</option>
          </select>
        </div> */}

        {/* Product */}
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium mb-1">
            Product
          </label>
          <select
            id="model"
            name="model"
            className="rounded-md border-gray-600 border bg-gray-700 text-white p-2 w-full"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">---Select---</option>
            <option>Add Product</option>
            <option>View Product</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 w-full rounded-md"
          onClick={() => navigate("/sold")} 
        >
          Sold Product
        </button>
      </div>

      {/* Logout Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        onClick={() => navigate("/Login")}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSideBar;
