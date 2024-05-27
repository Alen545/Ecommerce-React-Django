import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import UserNavbar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); 

  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.66elZ0rdKa61JlWQw8G7XgHaGf?w=240&h=211&c=7&r=0&o=5&dpr=1.5&pid=1.7";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("Token");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.user_id;
          const response = await axios.get(
            `http://127.0.0.1:8000/api/user/${userId}/`
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("user_image", selectedFile);

      try {
        const token = Cookies.get("Token");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.user_id;
          await axios.put(
            `http://127.0.0.1:8000/api/user/${userId}/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const response = await axios.get(
            `http://127.0.0.1:8000/api/user/${userId}/`
          );
          setUser(response.data);
          setSelectedFile(null);
          toast.success("Image uploaded successfully");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = Cookies.get("Token");
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.user_id;
        await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Account deleted successfully");
        navigate("/Login"); 
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Error loading user data</p>;
  }

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded p-4">
          <div className="flex flex-col items-center">
            <img
              src={
                user.user_image
                  ? `http://127.0.0.1:8000/api${user.user_image}`
                  : defaultImageUrl
              }
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="mt-2 mb-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Add image
            </label>
            {selectedFile && (
              <button
                onClick={handleFileUpload}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mt-4">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.location}</p>
            <p className="text-gray-600">{user.phone_no}</p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
      <GuestFooter />
      <ToastContainer />
    </div>
  );
}

export default Profile;
