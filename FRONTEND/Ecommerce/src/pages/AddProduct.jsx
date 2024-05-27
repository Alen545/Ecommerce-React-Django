import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSideBar from "../components/AdminSideBar";

function AddProduct() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/viewcompanies/")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
    axios
      .get(`http://127.0.0.1:8000/api/viewcategories/${companyId}/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("company", selectedCompany);
    formData.append("category", selectedCategoryId);
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .post("http://127.0.0.1:8000/api/addproduct/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        setSelectedCompany("");
        setSelectedCategoryId("");
        setProductName("");
        setPrice("");
        setSize("");
        setColor("");
        setImages([]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col space-y-4"
      >
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2" htmlFor="companyName">
                Company Name
              </label>
              <select
                id="companyName"
                name="companyName"
                value={selectedCompany}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2" htmlFor="categoryName">
                Category Name
              </label>
              <select
                id="categoryName"
                name="categoryName"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2" htmlFor="price">
                Product Name
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="size">
                Size
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="color">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="image">
                Images
              </label>
              <input
                type="file"
                id="image"
                name="image"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
