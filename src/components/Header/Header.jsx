import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import './Header.css'
import { useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState()
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  const searchQueryHandler = (e) => {
    if(e.key === 'Enter' && query.length > 0){
      navigate(`/search${query}`)
      setTimeout(() => {
       setShowSearch(false);
      }, 1000);
    }
  }
  const openSearch = () => {
    setShowSearch(true);
  };
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="nav-bottom">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex">
              <button className="navbar-toggler" onClick={toggleMenu}><i className="fa-solid fa-bars"></i></button>

                <div className="logo">
                <a className="navbar-logo" href="/">Asgo</a>
                </div>
              </div>
              <div className="search">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-12">
                    <form className="navbar-search">
                      <input type="text" value={input} placeholder="Ara" />
                      <button type="submit" disabled={input === ''}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="nav-menu-">
                <ul className={`navbar-menu ${menuOpen ? "active" : ''}`}>
                  {/* <div className="nav-mobMenu">
                    <CgProfile />
                  </div> */}
                  <li><a href="/">Home</a></li>
                  <li><a href="/categories">Categories</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/cart" className='cart-link'>
                  <AiOutlineShoppingCart /> 
                  <span className='cart-count'>1</span>        
                  </a></li>
                  
                </ul>
              </div>
              <div className="mobile-menu">
              <HiOutlineSearch onClick={openSearch}/>
              <NavLink className='Cart' to='/cart'>
              <span className="cart-span"><AiOutlineShoppingCart />
                <span className="cart-count">1</span>
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
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyUp={searchQueryHandler}
                    />
                    <VscChromeClose onClick={() => setShowSearch(false)} />
                  </div>
                </div>
              </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header