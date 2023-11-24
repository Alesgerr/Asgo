import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
import "./Category.css";
import Skeleton from "react-loading-skeleton";
import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const CategoryDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Seçilen kategori
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${id}`
      );
      setProduct(res.data.products);
      setOriginalProducts(res.data.products);
      setLoading(false);
    };
    getProduct();
  }, [id]);
  const Loading = () => {
    return (
      <>
        <div className="skeleton-loading">
          <div className="container">
            <div className="row g-1">
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton
                  height={200}
                  style={{ width: "100%", height: "max-content" }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const addToCartHandle = (item) => {
    dispatch(
      cartActions.addItem({
        ...item,
        quantity: 1,
      })
    );
  };

  const filteredProduct = selectedCategory
    ? product.filter((product) => product.category === selectedCategory)
    : product;

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    // Şimdi `searchTerm` değişkeni, inputun değerini içeriyor.
    // Bu değeri kullanabilirsiniz.
    if (searchTerm.trim() === "") {
      setProduct(originalProducts);
    } else {
      const searchedProducts = originalProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProduct(searchedProducts);
    }
  };
  const handleChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);

    // Sıralama türüne göre ürünleri sırala
    if (selectedSortType === "ascending") {
      setProduct([...product].sort((a, b) => a.price - b.price));
    } else if (selectedSortType === "descending") {
      setProduct([...product].sort((a, b) => b.price - a.price));
    } else if (selectedSortType === "sort") {
      setProduct(originalProducts);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <div className="category-detail">
      {loading ? (
        <Loading />
      ) : (
        <div className="container-md">
          <div className="breadcrumb">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <NavLink>{id}</NavLink>
              </li>
            </ul>
          </div>
          <div className="category-header">
            <div className="category-head-title">
              <h2 className="text-center">{id}</h2>
            </div>
          </div>
          <div className="filter-top">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="filter-widget">
                  <select
                    placeholder="Sort by"
                    className="select"
                    value={sortType}
                    onChange={handleChange}
                  >
                    <option value="sort">Sorting</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12 col-12">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={handleSearch}
                  />
                  <span>
                    <AiOutlineSearch />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-1 mt-3">
            {filteredProduct.length === 0 ? (
              <h3 className="text-center mt-5">No products are found!</h3>
            ) : (
              filteredProduct?.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-6" key={index}>
                  <div className="flashCard">
                    <Link to={`/product/${item.id}`}>
                      <div className="img-div">
                        <img src={item.images[0]} alt="" />
                      </div>
                    </Link>
                    <div className="title-box">
                      <h6>{item.title.substring(0, 25)}</h6>
                    </div>
                    {/* <div className="rating-box">
                        <span>
                          <AiFillStar className="rating" /> {item.rating}
                        </span>
                      </div> */}
                    <div className="price-box">
                      <p className="price-item">
                        <span>{item.price}</span>
                        <i className="p-1  fa-solid fa-dollar-sign"></i>
                      </p>
                      <div className="btn-box">
                        <button
                          className="btn-cart"
                          onClick={() => addToCartHandle(item)}
                        >
                          <span>
                            <i className="fa-solid fa-cart-shopping"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
