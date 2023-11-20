import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import FlashCard from "../../components/Collections/FlashCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
const Home = () => {
  const [datas, setDatas] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    const allowedCategories = [
      "smartphones",
      "laptops",
      "home-decoration",
      "furniture",
      // "skincare",
      // "fragrances"
    ];
    const filteredCategories = data.filter((category) =>
      allowedCategories.includes(category)
    );

    setDatas(filteredCategories);
    setDataList(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const pageTitle = "Welcome to Our Website";
  const pageDescription = "Explore our website and discover amazing content.";
  const categoryImageUrls = {
    smartphones: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    laptops: "https://i.dummyjson.com/data/products/6/thumbnail.png",
    "home-decoration": "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
    furniture: "https://i.dummyjson.com/data/products/35/thumbnail.jpg",
    skincare: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
    fragrances: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
  };
  const Loading = () => {
    return (
      <>
        <div className="skeleton-loadinng mt-3">
          <div className="container">
            <div className="row g-1">
              <div className="col-md-2 col-sm-4">
                <Skeleton style={{ width: "100%", height: "500px" }} />
              </div>
              <div className="col-md-10 col-sm-4 col-12">
                <Skeleton style={{ width: "100%", height: "500px" }} />
              </div>
            </div>
            <div className="row g-1 mt-5">
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <div className="sect-2 mt-3">
            <Helmet>
              <title>{pageTitle}</title>
              <meta name="description" content={pageDescription} />
            </Helmet>
            <div className="container-md">
              <div className="row g-3 banner">
                <div className="d-none col-lg-2 col-md-2 banner-cat">
                  <div className="catalog">
                    <div className="cat-list">
                      <div className="banner-box">
                        <ul>
                          {dataList?.slice(0, 20).map((item, i) => (
                            <li key={i}>
                              <Link to={`/category/${item}`}>
                                {item}
                                <AiOutlineArrowRight />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="banner-boxx">
                    <HomeSlider />
                  </div>
                </div>
                <div className="col-lg-3 mob-cat">
                  <div className="mob-cat-list">
                    <div className="banner-box2">
                      <div className="row g-2">
                        {datas?.map((item, i) => (
                          <div className="col-md-6 col-lg-6 col-6" key={i}>
                            <Link to={`/category/${item}`}>
                              <div className="home-cat">
                                <div className="box-img">
                                  <img
                                    className="cat-img"
                                    src={categoryImageUrls[item]}
                                    alt=""
                                  />
                                  <div className="category-overlay"></div>
                                  <div className="box home-cat-box">
                                    <div className="box-title">{item}</div>
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
            </div>
          </div>
          <div className="sect-3">
            <div className="flash-card">
              <FlashCard />
            </div>
            <div className="subs">
              <div className="form-container">
                <div className="title">Subscribe</div>
                <div className="sub-title">Get the latest discounts and news.</div>
                <div className="input-group">
                  <input type="email" placeholder="Your Email Address" />
                  <button type="submit">Subscribe</button>
                </div>
                <div className="error-message d-none">The email address is not valid.</div>
                <div className="contact-info">Communication: info@example.com</div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
