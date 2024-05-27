import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineMessage } from "react-icons/md";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";

function UserProductdetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productReview, setProductReview] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [reviewAdd, setReviewAdd] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [cartValues, setCartValues] = useState([]);

  const token = Cookies.get("Token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cartvalues/?userId=${decoded.user_id}`)
      .then((response) => {
        setCartValues(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [decoded.user_id]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/userproductdetails/${productId}/`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/review/${id}/`)
      .then((response) => {
        setProductReview(response.data);
        console.log("review", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const addReview = () => {
    setToggle(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("review", reviewAdd);
    formData.append("rating", reviewRating);
    formData.append("userid", decoded.user_id);
    formData.append("productid", id);

    axios
      .post("http://127.0.0.1:8000/api/reviewadd/", formData)
      .then((response) => {
        console.log(response.data);
        setProductReview([...productReview, response.data]);
        setReviewAdd("");
        setReviewRating(0);
        setToggle(false);
        toast.success("Review added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Failed to add review", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const isProductInCart = cartValues.some((item) => item.product === id);

  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append("product", id);
    formData.append("list_user", decoded.user_id);
    formData.append("productname", product.name);
    formData.append("productprice", product.price);

    axios
      .post("http://127.0.0.1:8000/api/cart/", formData)
      .then((response) => {
        console.log(response.data);
        toast.success(`${product.name} Added to Cart`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const totalRatings = productReview.length;
  const totalRatingValue = productReview.reduce(
    (total, review) => total + review.rating,
    0
  );
  const avgRating = totalRatingValue / totalRatings;

  const reviewDelete = (reviewId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/reviewdelete/${reviewId}/`)
      .then((response) => {
        console.log(response.data);
        toast.success("Review Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setProductReview((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto px-4 mt-8">
        {product && (
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
              <div className="w-full md:w-1/2 md:ml-8 mt-4 md:mt-0 flex items-center">
                <div>
                  <h1
                    className="text-3xl font-semibold mb-2"
                    style={{ fontFamily: "Arial,sans-serif" }}
                  >
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    {product.company.logo && (
                      <img
                        src={`http://127.0.0.1:8000/api${product.company.logo}`}
                        alt="Company Logo"
                        className="w-24 h-auto rounded-full mr-4"
                      />
                    )}
                    <div>
                      <p
                        className="text-gray-600 mb-2"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {product.company.name}
                      </p>
                      <p
                        className="text-gray-600 mb-4"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {product.company.description}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Category: {product.category}
                  </p>
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Size: {product.size}
                  </p>
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Color: {product.color}
                  </p>
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Price: {product.price} INR
                  </p>

                  <div className="flex">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleAddToCart}
                      disabled={isProductInCart}
                    >
                      {isProductInCart ? "Already in Cart" : "Add to Cart"}
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">
                      Buy Now
                    </button>
                  </div>
                  <div className="reviewwrite1 mt-4">
                    <div className="reviewwrite2 flex items-center">
                      <MdOutlineMessage />
                      <p className="ml-2">Write a review</p>
                    </div>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                      onClick={addReview}
                    >
                      Add Review
                    </button>
                    {toggle && (
                      <form onSubmit={handleReviewSubmit} className="mt-4">
                        <textarea
                          value={reviewAdd}
                          onChange={(e) => setReviewAdd(e.target.value)}
                          className="border rounded w-full py-2 px-3"
                          placeholder="Write your review here"
                          required
                        />
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              onClick={() => setReviewRating((index + 1) * 20)}
                              style={{ cursor: "pointer" }}
                            >
                              {reviewRating >= (index + 1) * 20 ? (
                                <StarFilled style={{ color: "orange" }} />
                              ) : (
                                <StarOutlined />
                              )}
                            </span>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>
                  <div className="reviews mt-4">
                    <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
                    {productReview.map((review) => {
                      const user = users.find(
                        (user) => user.id === review.user
                      );
                      return (
                        <div
                          key={review.id}
                          className="border p-4 mb-4 rounded-lg"
                        >
                          <div className="flex justify-between">
                            <div>
                              <div className="flex items-center">
                                <label className="font-semibold">By:</label>
                                <h4 className="ml-2">
                                  {user ? user.username : "Unknown user"}
                                </h4>
                              </div>
                              <p className="text-gray-600 mt-1">
                                {review.created_at}
                              </p>
                            </div>
                            {user && user.id === decoded.user_id && (
                              <button
                                onClick={() => reviewDelete(review.id)}
                                className="text-red-500"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <p className="mt-2">{review.review}</p>
                          <div className="flex mt-2">
                            {[...Array(5)].map((_, index) => (
                              <span key={index}>
                                {review.rating >= index + 1 ? (
                                  <StarFilled style={{ color: "orange" }} />
                                ) : (
                                  <StarOutlined />
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-gray-600 mt-4">
                      Average Rating:{" "}
                      {avgRating ? avgRating.toFixed(1) : "No ratings yet"} / 5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <GuestFooter />
      <ToastContainer />
    </div>
  );
}

export default UserProductdetails;
