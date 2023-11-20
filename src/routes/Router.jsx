import Page404 from "../pages/404/Page404";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import ProductDetail from "../components/ProductDetails/ProductDetail";
import CategoryDetail from "../components/Category/CategoryDetail";
import Categories from "../components/Category/Categories";
import Footer from "../components/Footer/Footer";
import Cart from "../pages/Cart/Cart";
import Shop from "../pages/Shop/Shop";
import Checkout from "../pages/Checkout/Checkout";
import Register from "../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Profile/ForgotPassword";
import SearchPage from "../components/ProductPage/SearchPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="category/:id" element={<CategoryDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
