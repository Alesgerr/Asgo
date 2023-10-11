import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import FlashCard from "../../components/Collections/FlashCard";

const Home = () => {
    const [datas, setDatas] = useState([])
    
    const fetchData = async () => {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      const allowedCategories = ["smartphones", "laptops", "home-decoration", "furniture"];
      const filteredCategories = data.filter(category => allowedCategories.includes(category));
     
      setDatas(filteredCategories)
    }
  useEffect(() => {
    fetchData()
  },[])
  const categoryImageUrls = {
    "smartphones": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "laptops": "https://i.dummyjson.com/data/products/6/thumbnail.png",
    "home-decoration": "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
    "furniture": "https://i.dummyjson.com/data/products/35/thumbnail.jpg",
  };

  return (
    <main>
      {/* <div className="sect-1">
        <div className="container-fluid flex-container">
          <div className="menu-holder">
            <div className="home-nav">
              <ul className="nav-list">
                <li className="nav-list-item">
                  <a
                    href="https://localhost/catalog/telefonlar-qadcetler/"
                    className="nav-list-link"
                  >
                    Telefonlar, planşetlər və qadcetlər
                  </a>
                  <div className="main-menu-dropdown">
                    <ul className="nav-list">
                      <li className="nav-list-item">
                        <a
                          href="https://localhost/catalog/telefonlar-qadcetler/smartfonlar-mobil-telefonlar/"
                          className="nav-list__link"
                        >
                          Smartfonlar, mobil telefonlar
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className="sect-2 mt-2">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-8">
            <HomeSlider />
            </div>
            <div className="col-lg-4">
              <div className="row g-2">
                {datas?.map((item,i) => (
                <div className="col-md-4 col-lg-6 col-6" key={i}>
                <Link to={`/category/${item}`}>
                  <div className="home-cat">
                    <div className="box-img">
                      <img className="cat-img" src={categoryImageUrls[item]} alt="" />
                      <div className="category-overlay"></div>
                      <div className="box home-cat-box">
                        <div className="box-title">
                          {item}
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="sect-3">
        <div>
          <FlashCard />
        </div>
      </div>
    </main>
  );
};

export default Home;
