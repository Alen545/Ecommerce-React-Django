import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { productId } = useParams();
  const [productName, setProductName] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/editproduct/${productId}/`)
      .then((response) => {
        const { name, size, color, price, images } = response.data;
        setProductName(name);
        setProductSize(size);
        setProductColor(color);
        setProductPrice(price);
        setProductImages(images);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleSubmit = async (e) => {
    console.log(productId);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("size", productSize);
      formData.append("color", productColor);
      formData.append("price", productPrice);

      productImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await axios.put(
        `http://127.0.0.1:8000/api/editproduct/${productId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block font-semibold mb-2">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productSize" className="block font-semibold mb-2">
              Product Size:
            </label>
            <input
              type="text"
              id="productSize"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productColor" className="block font-semibold mb-2">
              Product Color:
            </label>
            <input
              type="text"
              id="productColor"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={productColor}
              onChange={(e) => setProductColor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block font-semibold mb-2">
              Product Price:
            </label>
            <input
              type="text"
              id="productPrice"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productImages" className="block font-semibold mb-2">
              Product Images:
            </label>
            <input
              type="file"
              id="productImages"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleImageChange}
              multiple
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
