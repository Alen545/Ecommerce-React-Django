import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GuestFooter from "../components/GuestFooter";
import { FiShoppingCart } from "react-icons/fi";
import { VscListUnordered } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

function User() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/userproductlist/"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.company_name.toLowerCase().includes(search.toLowerCase());

      const matchesPriceRange =
        !filters.priceRange ||
        (filters.priceRange === "1000-2000" &&
          product.price >= 1000 &&
          product.price <= 2000) ||
        (filters.priceRange === "2000-3500" &&
          product.price > 2000 &&
          product.price <= 3500) ||
        (filters.priceRange === "5000+" && product.price > 5000);

      return matchesSearch && matchesPriceRange;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/User")}
        >
          <span className="text-white mr-4 font-semibold">Alen's Store</span>
        </div>

        <div className="flex-grow mx-4">
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-l bg-gray-700 text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-700 text-white py-2 px-4 rounded-r"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <FiShoppingCart
            className="h-6 w-6 text-white cursor-pointer"
            onClick={() => navigate("/Cart")}
          />
          <VscListUnordered
            className="h-6 w-6 text-white cursor-pointer"
            onClick={() => navigate("/listorder")}
          />
          <CgProfile
            className="h-6 w-6 text-white cursor-pointer"
            onClick={() => navigate("/Profile")}
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => navigate("/Login")}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="main-content flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="1000-2000"
                  checked={filters.priceRange === "1000-2000"}
                  onChange={handleFilterChange}
                />
                <span className="ml-2">1000-2000</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="2000-3500"
                  checked={filters.priceRange === "2000-3500"}
                  onChange={handleFilterChange}
                />
                <span className="ml-2">2000-3500</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="5000+"
                  checked={filters.priceRange === "5000+"}
                  onChange={handleFilterChange}
                />
                <span className="ml-2">5000+</span>
              </label>
            </div>
          </div>
        </aside>

        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/UserProductdetails/${product.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <img
                    src={`http://127.0.0.1:8000/api${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <p className="text-gray-600">Rs. {product.price}</p>
                  <p className="text-gray-600">{product.company_name}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      </div>

      <GuestFooter />
    </div>
  );
}

export default User;
