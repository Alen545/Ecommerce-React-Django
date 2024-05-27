import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";

function GuestHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/userproductlist/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/GuestProduct/${productId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <GuestNavBar />
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <h1 className="text-3xl font-bold mb-8">Welcome to Alen's Store!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer"
              onClick={() => handleCardClick(product.id)}
            >
              <img
                src={`http://127.0.0.1:8000/api${product.image}`}
                alt={product.name}
                className="w-full h-auto mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
      <GuestFooter />
    </div>
  );
}

export default GuestHome;
