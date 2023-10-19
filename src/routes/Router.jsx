import Page404 from "../pages/404/Page404";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "../components/ProductDetails/ProductDetail";
import CategoryDetail from "../components/Category/CategoryDetail";
import Categories from "../components/Category/Categories";
import Footer from "../components/Footer/Footer";
import Cart from "../pages/Cart/Cart";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const BrowserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "category/:id",
          element: <CategoryDetail />,
        },
        {
          path: 'cart',
          element: <Cart />
        }
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
}
