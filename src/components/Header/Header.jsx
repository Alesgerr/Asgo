import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart, AiFillCaretDown } from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { motion } from "framer-motion";
import profile from "../../assets/profile.png";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase.config";
import toast from "react-hot-toast";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProductsIds, setSelectedProductIds] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [showSearch, setShowSearch] = useState("");
  const cartLength = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
      })
      .catch(() => {
        toast.error("Logout failed. Please try again.");
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const menuButton = document.getElementById("menuButton");
    menuButton.classList.toggle("open");
  };

  // const searchQueryHandler = (e) => {
  //   if (e.key === "Enter" && query.length > 0) {
  //     navigate(`/search${query}`);
  //     setTimeout(() => {
  //       setShowSearch(false);
  //     }, 1000);
  //   }
  // };
  const openSearch = () => {
    setShowSearch(true);
  };
  const navigationHandler = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Arama terimine göre ürünleri filtrele
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(results.length > 0);
  }, [searchTerm]);

  useEffect(() => {
    // Sayfa yüklendiğinde click event listener'ı ekle
    document.addEventListener("click", handleClickOutside);

    // Component kaldırıldığında event listener'ı temizle
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    ) {
      // Tıklanan yer search-results div'i dışında ise, search-results div'ini kapat
      setShowResults(false);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const showResults = searchTerm.length > 0 && searchResults.length > 0;
  return (
    <header>
      <div className="container-md">
        <div className="navbar">
          <div className="nav-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div className="nav-left">
                <div id="menuButton">
                  <button className="navbar-toggler" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>

                <div className="user-i">
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle d-flex align-items-center"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <motion.img
                          className="rounded-circle object-fit-cover"
                          width={25}
                          height={25}
                          whileTap={{ scale: 1.2 }}
                          src={currentUser ? currentUser.photoURL : profile}
                          alt={currentUser ? "" : ""}
                        />
                      </a>
                      {currentUser ? (
                        <ul
                          className="dropdown-menu dropdown-mob"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <div className="text-center mb-3">
                            <Link to="/profile">
                              <motion.img
                                src={
                                  currentUser ? currentUser.photoURL : profile
                                }
                                alt=""
                                className="rounded-circle object-fit-cover"
                                width={100}
                                height={100}
                              />
                            </Link>
                          </div>
                          <li>
                            <Link className="dropdown-item" to="/profile">
                              My profile
                            </Link>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={logout}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul
                          className="dropdown-menu dropdown-mob"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <li>
                            <Link className="dropdown-item" to="/login">
                              Login
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="logo">
                <Link className="navbar-logo" to="/">
                  Asgo
                </Link>
              </div>
              <div className="search">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="navbar-search">
                      <HiOutlineSearch className="tab-search" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search for products..."
                      />
                    </div>
                    {showResults && (
                      <div className="search-result" ref={searchResultsRef}>
                        {searchResults.slice(0, 5).map((product) => (
                          <div key={product.id}>
                            <div
                              className="search-result-box"
                              onClick={() => setShowResults(false)}
                            >
                              <Link to={`/product/${product.id}`}>
                                <div className="d-flex justify-content-between p-3">
                                  <div className="show-search-left d-flex">
                                    <img
                                      src={product.images[0]}
                                      width={50}
                                      height={50}
                                      alt={product.title}
                                    />
                                    <p className="search-result-title">
                                      {product.title}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-danger fw-bold">
                                      {" "}
                                      ${product.price}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="nav-menu">
                <ul
                  className={`navbar-menu ${menuOpen ? "active" : ""}`}
                  onClick={navigationHandler}
                >
                  <li>
                    <NavLink to="/shop">Shop</NavLink>
                  </li>
                  <li className="">
                    <NavLink to="/categories">
                      Categories
                      {/* <AiFillCaretDown /> */}
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/cart" className="cart-link">
                      <AiOutlineShoppingCart />
                      <span className="cart-count">{cartLength.length}</span>
                    </NavLink>
                  </li>
                  <div className="user-i">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle d-flex align-items-center"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-mdb-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <motion.img
                            className="rounded-circle object-fit-cover"
                            height={35}
                            width={35}
                            whileTap={{ scale: 1.2 }}
                            src={currentUser ? currentUser.photoURL : profile}
                            alt={currentUser ? "" : ""}
                            loading="eager"
                          />
                        </a>
                        {currentUser ? (
                          <ul
                            className="dropdown-menu dropdown-p"
                            aria-labelledby="navbarDropdownMenuLink"
                          >
                            <div className="text-center mb-3">
                              <Link to="/profile">
                                <motion.img
                                  src={
                                    currentUser ? currentUser.photoURL : profile
                                  }
                                  alt=""
                                  className="rounded-circle object-fit-cover"
                                  width={100}
                                  height={100}
                                />
                              </Link>
                            </div>
                            <li>
                              <Link className="dropdown-item" to="/profile">
                                My profile
                              </Link>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={logout}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        ) : (
                          <ul
                            className="dropdown-menu dropdown-p"
                            aria-labelledby="navbarDropdownMenuLink"
                          >
                            <li>
                              <Link className="dropdown-item" to="/login">
                                Login
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                </ul>
              </div>
              <div className="mobile-menu">
                <HiOutlineSearch onClick={openSearch} />
                <NavLink className="Cart" to="/cart">
                  <span className="cart-span">
                    <AiOutlineShoppingCart />
                    <span className="cart-count">{cartLength.length}</span>
                  </span>
                </NavLink>
              </div>
              {showSearch && (
                <div className="searchBar">
                  <div>
                    <div className="searchInput">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                    {showResults && (
                      <div className="search-result" ref={searchResultsRef}>
                        {searchResults.slice(0, 5).map((product) => (
                          <div key={product.id}>
                            <div
                              className="search-result-box"
                              onClick={() => setShowSearch(false)}
                            >
                              <Link to={`/product/${product.id}`}>
                                <div className="d-flex justify-content-between p-3">
                                  <div className="show-search-left d-flex">
                                    <img
                                      src={product.images[0]}
                                      width={50}
                                      height={50}
                                      alt={product.title}
                                    />
                                    <p className="search-result-title">
                                      {product.title}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-danger fw-bold">
                                      {" "}
                                      ${product.price}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="nav-menu-">
            <ul
              className={`navbar-menu ${menuOpen ? "active" : ""}`}
              onClick={navigationHandler}
            >
              {/* <div className="nav-mobMenu">
                    <CgProfile />
                  </div> */}
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
