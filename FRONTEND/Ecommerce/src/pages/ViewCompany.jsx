import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewCompany() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/viewcompanies/")
      .then((response) => {
        console.log(response.data)
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  // Edit
  const handleEdit = (id) => {
    navigate(`/EditCompany/${id}`);
  };

  // Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/Edit_Delete/${id}/`)
      .then(() => {
        setCompanies(companies.filter((company) => company.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
      });
  };

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>

      <div className="flex-1 p-4 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">View Companies</h1>

        <div className="min-w-full overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sl No:
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company, index) => (
                <tr key={company.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <img
                      src={`http://127.0.0.1:8000/api${company.logo}`}
                      alt={company.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="text-red-600 hover:text-red-900"
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
    </div>
  );
}

export default ViewCompany;
