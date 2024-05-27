import React, { useState, useEffect, useRef } from 'react';
import AdminSideBar from "../components/AdminSideBar";
import axios from 'axios';

function AddModel() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modelName, setModelName] = useState('');
  const imagesRef = useRef(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/viewcompanies/');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    if (selectedCompany) {
      fetchCategories(selectedCompany);
    }
  }, [selectedCompany]);

  const fetchCategories = async (companyId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/viewcategories/${companyId}/`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', modelName);
    formData.append('category', selectedCategory);
    Array.from(imagesRef.current.files).forEach((file) => {
      formData.append('image', file);
    });
    console.log('Form data:', formData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/addmodel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Model added successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error adding model:', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Model Registration</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company" className="block">Company Name:</label>
            <select 
              id="company" 
              className="w-full border border-gray-300 rounded p-2"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block">Category Name:</label>
            <select 
              id="category" 
              className="w-full border border-gray-300 rounded p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block">Model Name:</label>
            <input 
              type="text" 
              id="model" 
              placeholder="Enter Model Name" 
              className="w-full border border-gray-300 rounded p-2"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="images" className="block">Images:</label>
            <input 
              type="file" 
              id="images" 
              multiple 
              className="w-full border border-gray-300 rounded p-2"
              ref={imagesRef}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddModel;
