import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";

function AddCompany() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);

    axios
      .post("http://127.0.0.1:8000/api/addcompany/", formData)
      .then((res) => {
        console.log(res.data);
        setName("");
        setDescription("");
        setLogo("");
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

      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Add Company</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="companyName" className="block font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>

          <div>
            <label
              htmlFor="companyDescription"
              className="block font-medium mb-1"
            >
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            ></textarea>
          </div>

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

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
