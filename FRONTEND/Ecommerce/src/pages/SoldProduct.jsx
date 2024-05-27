import React, { useState, useEffect } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import axios from 'axios';

function SoldProduct() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getallorders/');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex">
     <div className="w-64">
        <AdminSideBar />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Sold Products</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Shipping Address</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <div className="flex items-center">
                        <div className="mr-2">{order.product_name}</div>
                      </div>
                    </td>
                    <td className="border px-4 py-2">{order.product_quantity}</td>
                    <td className="border px-4 py-2">{order.shipingaddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoldProduct;
