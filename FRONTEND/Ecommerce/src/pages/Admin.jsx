import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import axios from 'axios';
import { FiUsers } from "react-icons/fi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";

function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const numofusers = users.length;
  const numofproducts = products.length;

  useEffect(() => {
    getUsers();
    getProducts();
    getTotalSales();
  }, []);

  const getUsers = () => {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    axios.get('http://127.0.0.1:8000/api/userproductlist/')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalSales = () => {
    axios.get('http://127.0.0.1:8000/api/total_sales/')
      .then((res) => {
        setTotalSales(res.data.total_sales);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 bg-gray-800">
        <AdminSideBar />
      </div>
      <div className="flex-1 bg-gray-100 p-6">
        <div className="text-center text-2xl font-bold mb-6">Welcome to Alen's Store</div>
        <div className="flex flex-wrap justify-around">
          <div className="dashboardcontents bg-white shadow rounded p-4 m-2 w-full sm:w-1/3 md:w-1/4">
            <FiUsers className="h-12 w-12 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Users</h4>
            <h3 className="text-2xl font-bold">{numofusers}</h3>
          </div>
          <div className="dashboardcontents bg-white shadow rounded p-4 m-2 w-full sm:w-1/3 md:w-1/4">
            <MdOutlineProductionQuantityLimits className="h-12 w-12 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Products</h4>
            <h3 className="text-2xl font-bold">{numofproducts}</h3>
          </div>
          <div className="dashboardcontents bg-white shadow rounded p-4 m-2 w-full sm:w-1/3 md:w-1/4">
            <FaDollarSign className="h-12 w-12 mx-auto mb-2" />
            <h4 className="text-lg font-semibold">Total Profit</h4>
            <h3 className="text-2xl font-bold">{totalSales.toFixed(2)} INR</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
