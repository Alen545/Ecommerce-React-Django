import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import GuestNavBar from "../components/GuestNavBar";
import GuestFooter from "../components/GuestFooter";
import Slider from "react-slick";

function GuestProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/userproductdetails/${productId}/`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    navigate("/Login");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <GuestNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <Slider {...settings}>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://127.0.0.1:8000/api${image}`}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-auto mb-4"
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/2 md:ml-8 mt-4 md:mt-0 flex flex-col justify-center">
              <div>
                <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
                  {product.name}
                </h1>
                <div className="flex items-center mb-6">
                  {product.company.logo && (
                    <img
                      src={`http://127.0.0.1:8000/api${product.company.logo}`}
                      alt="Company Logo"
                      className="w-16 h-16 rounded-full mr-4"
                    />
                  )}
                  <div>
                    <p className="text-gray-700 text-lg mb-1" style={{ fontFamily: "Arial, sans-serif" }}>
                      {product.company.name}
                    </p>
                    <p className="text-gray-500" style={{ fontFamily: "Arial, sans-serif" }}>
                      {product.company.description}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700" style={{ fontFamily: "Arial, sans-serif" }}>
                    Category: <span className="font-semibold">{product.category}</span>
                  </p>
                  <p className="text-gray-700" style={{ fontFamily: "Arial, sans-serif" }}>
                    Size: <span className="font-semibold">{product.size}</span>
                  </p>
                  <p className="text-gray-700" style={{ fontFamily: "Arial, sans-serif" }}>
                    Color: <span className="font-semibold">{product.color}</span>
                  </p>
                  <p className="text-gray-700 text-2xl font-bold" style={{ fontFamily: "Arial, sans-serif" }}>
                    Price: {product.price} INR
                  </p>
                </div>
                <div className="flex flex-col md:flex-row">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
                    onClick={handleAddToCart}
                    disabled={isProductInCart}
                  >
                    {isProductInCart ? "Already in Cart" : "Add to Cart"}
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GuestFooter />
    </div>
  );
}

export default GuestProduct;
