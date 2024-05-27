import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";

const AddCategory = () => {
  const [company, setCompany] = useState("");
  const [categories, setCategories] = useState({
    MEN: false,
    WOMEN: false,
    KIDS: false,
  });
  const [companyOptions, setCompanyOptions] = useState([]);

  useEffect(() => {//company fetched
    axios
      .get("http://127.0.0.1:8000/api/viewcompanies/")
      .then((response) => {
        setCompanyOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
//form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if a company is selected
    if (!company) {
      console.error("Please select a company.");
      return;
    }

    // Check if at least one category is checked
    const selectedCategories = Object.keys(categories).filter(
      (key) => categories[key]
    );
    if (selectedCategories.length === 0) {
      console.error("Please select at least one category.");
      return;
    }

    // Prepare data to be sent to the backend
    const data = {
      company: company,
      name: selectedCategories.join(","),
    };

    axios
      .post("http://127.0.0.1:8000/api/addcategory/", data)
      .then((response) => {
        console.log("Category added successfully:", response.data);
        // Refresh the page after successfully saving the category
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  
  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <select
              id="company"
              name="company"
              className="rounded-md border-gray-600 border bg-gray-100 text-gray-800 p-2 w-full"
              value={company}
              onChange={handleCompanyChange}
            >
                {/* Companys List Based on Dropdown */}
              <option value="">---Select Company---</option>
              {companyOptions.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <div className="space-y-2">
                {/* Object.entries(categories) is used to convert the categories object 
                into an array of [key, value] pairs, each key means Men,Women,kids 
                and values is checked or not */}
              {Object.entries(categories).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor={key} className="text-sm">
                    {key}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Save
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
