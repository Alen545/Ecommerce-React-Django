import React, { useState, useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import axios from "axios";

function ViewModel() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [models, setModels] = useState([]);
  const [editedModel, setEditedModel] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/viewcompanies/"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchModels = async (categoryId, categoryName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/models/${categoryId}/`
      );
      const modelsWithData = response.data.map((model) => ({
        ...model,
        categoryName: categoryName,
      }));
      setModels(modelsWithData);
    } catch (error) {
      console.error("Error fetching models:", error);
      setModels([]);
    }
  };

  const handleCompanyChange = async (e) => {
    const companyId = e.target.value;
    setSelectedCompany(companyId);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/viewcategories/${companyId}/`
      );
      if (response.data.length > 0) {
        setModels([]);
        for (const category of response.data) {
          const categoryId = category.id;
          const categoryName = category.name;
          await fetchModels(categoryId, categoryName);
        }
      } else {
        setModels([]);
        console.log("No categories found for the selected company.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setModels([]);
    }
  };

  const handleEdit = (modelId) => {
    const modelToEdit = models.find((model) => model.id === modelId);
    setEditedModel({ ...modelToEdit });
    setEditMode(true);
  };

  const handleDelete = async (modelId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-model/${modelId}/`);
      setModels(models.filter((model) => model.id !== modelId));
      console.log("Model deleted successfully.");
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editedModel.name);
      formData.append("category", editedModel.category);
      formData.append("image", editedModel.image); // Assuming editedModel.image is the file object

      const response = await axios.put(
        `http://127.0.0.1:8000/api/edit-model/${editedModel.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedModel = response.data;

      setModels(
        models.map((model) =>
          model.id === updatedModel.id ? updatedModel : model
        )
      );
      setEditMode(false);
      console.log("Model updated successfully.");
    } catch (error) {
      console.error("Error updating model:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <AdminSideBar />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">View Models</h1>
        <div className="mb-4">
          <label htmlFor="company" className="block mb-2">
            Select Company:
          </label>
          <select
            id="company"
            className="w-full border border-gray-300 rounded p-2"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Sl. No.</th>
                <th className="border border-gray-400 px-4 py-2">
                  Category Name
                </th>
                <th className="border border-gray-400 px-4 py-2">Model Name</th>
                <th className="border border-gray-400 px-4 py-2">
                  Model Image
                </th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={model.id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {model.categoryName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {model.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <img
                      src={`http://127.0.0.1:8000/api${model.image}`}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                      alt={model.name}
                    />
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {editMode ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                    ) : (
                      <React.Fragment>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => handleEdit(model.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDelete(model.id)}
                        >
                          Delete
                        </button>
                      </React.Fragment>
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

export default ViewModel;
