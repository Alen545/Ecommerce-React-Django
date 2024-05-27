import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";

function ViewProduct() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (selectedCompany) {
      axios
        .get(`http://127.0.0.1:8000/api/viewproduct/${selectedCompany}/`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCompany]);

  const handleCompanyChange = (companyId) => {
    console.log(companyId);
    setSelectedCompany(companyId);
  };

  const handleDelete = (productId) => {
    console.log(productId);
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/deleteproduct/${productId}/`)
        .then((response) => {
          setProducts(products.filter((product) => product.id !== productId));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };
  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">View Products</h1>
        <div className="mb-4">
          <label htmlFor="companyName" className="block font-semibold mb-2">
            Select Company:
          </label>
          <select
            id="companyName"
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
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.size}</td>
                <td className="border px-4 py-2">{product.color}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProduct;
