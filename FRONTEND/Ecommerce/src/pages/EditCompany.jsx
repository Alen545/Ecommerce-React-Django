import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EditCompany() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null); 

  // Fetch the Company details based on id
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Edit_Delete/${id}/`)
      .then((response) => {
        setCompany(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error("Error fetching company details:", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault(); 
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);
  
    axios
      .put(`http://127.0.0.1:8000/api/Edit_Delete/${id}/`, formData)
      .then((res) => {
        console.log(res.data);
        setName("");
        setDescription("");
        setLogo(null);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data"> 
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Company Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-200 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Company Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-200 rounded-md p-2"
            />
          </div>
          {company && (
            <>
              <img
                src={`http://127.0.0.1:8000/api${company.logo}`}
                alt="Company Logo"
                className="w-full h-auto mb-4"
              />
              <div>
                <label htmlFor="companyLogo" className="block font-medium mb-1">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="companyLogo"
                  name="logo"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
              </div>
            </>
          )}
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            Update
          </button>
          <Link to="/ViewCompany" className="block mt-4 text-blue-500">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditCompany;
