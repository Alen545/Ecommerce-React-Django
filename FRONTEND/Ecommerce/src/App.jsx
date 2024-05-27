import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestHome from "./pages/GuestHome";
import Register from "./pages/Register";
import RegisterVerification from "./pages/RegisterVerification";
import Password from "./pages/Password";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import AddCompany from "./pages/AddCompany";
import ViewCompany from "./pages/ViewCompany";
import EditCompany from "./pages/EditCompany";
import AddCategory from "./pages/AddCategory";
import ViewCategory from "./pages/ViewCategory";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";
import UserProductdeatils from "./pages/UserProductdeatils";
import Cart from "./pages/Cart";
import Checkoutpage from "./pages/Checkoutpage";
import OrderConfirm from "./pages/OrderConfirm";
import ListOrder from "./pages/ListOrder";
import Profile from "./pages/Profile";
import GuestProduct from "./pages/GuestProduct";
import SoldProduct from "./pages/SoldProduct";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/RegisterVerification"
            element={<RegisterVerification />}
          />
          <Route path="/Register/Password" element={<Password />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/User" element={<User />} />
          <Route path="/AddCompany" element={<AddCompany />} />
          <Route path="/ViewCompany" element={<ViewCompany />} />
          <Route path="/EditCompany/:id" element={<EditCompany />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/ViewCategory" element={<ViewCategory />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ViewProduct" element={<ViewProduct />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
          <Route
            path="/UserProductdetails/:id"
            element={<UserProductdeatils />}
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/orderconfirm" element={<OrderConfirm />} />
          <Route path="/listorder" element={<ListOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/GuestProduct/:productId" element={<GuestProduct />} />
          <Route path="/sold" element={<SoldProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
