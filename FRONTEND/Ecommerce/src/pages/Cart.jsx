import React, { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function Cart() {
  const [cartvalues, setCartvalues] = useState([]);
  const [updatequantity, setUpdatequantity] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get("Token");
  let decoded;

  try {
    if (token) {
      decoded = jwtDecode(token);
    } else {
      throw new Error("No token found");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/login");
    return null;
  }

  useEffect(() => {
    if (token && decoded) {
      axios
        .get(`http://127.0.0.1:8000/api/cartvalues/?userId=${decoded.user_id}`)
        .then((response) => {
          setCartvalues(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart values:", error);
        });
    }
  }, []);

  const updatecart = (cartId) => {
    axios
      .patch(`http://127.0.0.1:8000/api/cartupdate/${cartId}`, {
        proquantity: updatequantity,
      })
      .then((response) => {
        setCartvalues(
          cartvalues.map((item) =>
            item.id === cartId ? { ...item, proquantity: updatequantity } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  const deletecart = (cartId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cartupdate/${cartId}`)
      .then((response) => {
        setCartvalues(cartvalues.filter((item) => item.id !== cartId));
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };

  const calculateSubtotal = (quantity, price) => quantity * price;

  const calculatetotalprice = () => {
    return cartvalues.reduce((total, cartitem) => {
      return (
        total + calculateSubtotal(cartitem.proquantity, cartitem.productprice)
      );
    }, 0);
  };

  const handlecheckout = () => {
    const products = cartvalues.map((cartitem) => ({
      productname: cartitem.productname,
      productquantity: cartitem.proquantity,
      producttotal: calculateSubtotal(
        cartitem.proquantity,
        cartitem.productprice
      ),
    }));

    const formData = new FormData();
    formData.append("userid", decoded.user_id);
    formData.append("products", JSON.stringify(products));

    axios
      .post("http://127.0.0.1:8000/api/checkout/", formData)
      .then((response) => {
        navigate("/checkout");
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="col-span-1 text-center font-semibold">No</div>
              <div className="col-span-1 text-center font-semibold">Action</div>
              <div className="col-span-1 text-center font-semibold">Name</div>
              <div className="col-span-1 text-center font-semibold">Price</div>
              <div className="col-span-1 text-center font-semibold">
                Quantity
              </div>
              <div className="col-span-1 text-center font-semibold">Total</div>
            </div>
            {cartvalues.map((cartvalue, index) => (
              <div
                key={cartvalue.id}
                className="grid grid-cols-5 gap-4 p-4 border-b"
              >
                <div className="col-span-1 text-center">{index + 1}</div>
                <div className="col-span-1 text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deletecart(cartvalue.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="col-span-1 text-center">
                  {cartvalue.productname}
                </div>
                <div className="col-span-1 text-center">
                  ₹ {cartvalue.productprice}
                </div>
                <div className="col-span-1 text-center flex justify-center items-center">
                  <input
                    name="quantity"
                    defaultValue={cartvalue.proquantity}
                    type="number"
                    min="1"
                    className="w-16 p-1 border rounded"
                    onChange={(e) => setUpdatequantity(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => updatecart(cartvalue.id)}
                  >
                    Update
                  </button>
                </div>
                <div className="col-span-1 text-center">
                  ₹{" "}
                  {calculateSubtotal(
                    cartvalue.proquantity,
                    cartvalue.productprice
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/4 bg-gray-100 p-4 rounded-lg mt-4 lg:mt-0">
            <div className="text-xl font-bold mb-4">Order Summary</div>
            <div className="text-lg mb-2">
              Subtotal: ₹ {calculatetotalprice()}
            </div>
            <button
              className="bg-green-500 text-white w-full py-2 rounded"
              onClick={handlecheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <GuestFooter />
    </div>
  );
}

export default Cart;
