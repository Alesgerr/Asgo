import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import "./Category.css";
import Skeleton from "react-loading-skeleton";
import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
const CategoryDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${id}`
      );
      setProduct(res.data.products);
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
          <div className="row g-1 mt-2">

            {product?.map((item) => (
              <div className="col-lg-3 col-md-4 col-6" key={item.id}>
                <div className="flashCard">
                  <Link to={`/product/${item.id}`}>
                    <div className="img-div">
                      <img src={item.thumbnail} alt="" />
                    </div>
                  </Link>
                  <div className="title-box">
                    <h6>{item.title}</h6>
                  </div>
                  {/* <div className="rating-box">
                  <span><AiFillStar className='rating' /> {item.rating}</span>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
