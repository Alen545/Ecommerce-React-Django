import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";

function ViewCategory() {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  //Company display
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/viewcompanies/")
      .then((response) => {
        setCompanyOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);
  //company selected
  const handleCompanyChange = async (event) => {
    const companyId = event.target.value;
    setSelectedCompany(companyId);

    //based on company id display category
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/viewcategories/${companyId}/`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/editcategory/${categoryId}/`, {
        name: editedCategoryName,
      });
      // Refresh categories after edit
      handleCompanyChange({ target: { value: selectedCompany } });
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/deletecategory/${categoryId}/`
      );
      handleCompanyChange({ target: { value: selectedCompany } });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">View Category</h1>
        {/* Company Dropdown */}
        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Select Company:
          </label>
          <select
            id="company"
            name="company"
            className="rounded-md border-gray-600 border bg-gray-100 text-gray-800 p-2"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">---Select Company---</option>
            {companyOptions.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Sl. No.</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {editingCategoryId === category.id ? (
                      <input
                        type="text"
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingCategoryId === category.id ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => {
                          console.log("Category ID:", category.id);
                          handleSaveEdit(category.id);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => handleEdit(category.id, category.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
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

export default ViewCategory;
