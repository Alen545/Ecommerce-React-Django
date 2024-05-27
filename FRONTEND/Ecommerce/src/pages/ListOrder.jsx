import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import UserNavbar from "../components/UserNavBar";
import GuestFooter from "../components/GuestFooter";

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const token = Cookies.get("Token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/orderlists/?userId=${decoded.user_id}`)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [decoded.user_id]);

  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-4">
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">ORDERS</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{order.product_name}</td>
                  <td className="py-2 px-4 border-b">
                    {order.product_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    RS{" "}
                    {calculateSubtotal(
                      order.product_quantity,
                      order.product_total
                    )}
                    /-
                  </td>
                  <td className="py-2 px-4 border-b">{order.shipingaddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <GuestFooter />
    </div>
  );
}

export default ListOrder;
