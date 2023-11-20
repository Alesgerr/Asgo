import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./ProductDetail.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiFillStar } from "react-icons/ai";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import Skeleton from "react-loading-skeleton";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [img, setImg] = useState([]);
  const addToCartHandle = (item) => {
    dispatch(
      cartActions.addItem({
        ...item,
        quantity: 1,
      })
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryProductsResponse] = await Promise.all([
          axios.get(`https://dummyjson.com/products/${id}`),
          axios.get(`https://dummyjson.com/products?limit=100`),
        ]);

        setProduct(productResponse.data);
        setImg(productResponse.data.images);

        const relatedProduct = categoryProductsResponse.data.products.filter(
          (item) => item.category === productResponse.data.category
        );
        setLoading(false);
        setRelatedProducts(relatedProduct);
      } catch (error) {
        console.error("Hata oluştu: ", error);
        setLoading(true);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  const handleIncrement = () => {
    dispatch(cartActions.incrementItem(product.id))
  }
  const handleDecrement = () => {
    dispatch(cartActions.decrementItem(product.id))
  }
  console.log(product);
  const Loading = () => {
    return (
      <>
        <div className="skeleton-loading">
          <div className="row">
            <div className="col-md-6">
              <Skeleton height={400} />
            </div>
            <div className="col-md-6">
              <Skeleton height={30} width={150} />
              <Skeleton height={75} />
              <Skeleton height={25} width={150} />
              <Skeleton height={50} />
              <Skeleton height={150} />
            </div>
          </div>
        </div>
      </>
    );
  };
  const images = img.map((number) => ({
    src: `${number}`,
  }));
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="product-detail">
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="row g-3">
            <div className="breadcrumb">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink>{product.title}</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="box">
                <div className="img-box bg-danger">
                  {/* {product.images && product.images.length > 0 ? (
                     <img src={product.images[1]} alt="" />
                     ) : (
                     <p>Product image not available.</p>
                     )} */}

                  {/* {img?.map((item, i) => (
                        <div key={i}>
                           <img src={item} alt="" />
                        </div>
                      ) )} */}
                  <Carousel
                    widgetsHasShadow="false"
                    shouldMaximizeOnClick="true"
                    shouldMinimizeOnClick="true"
                    shouldMinimizeOnSwipeDown="true"
                    playIcon=""
                    objectFit="contain"
                    thumbnailWidth="20%"
                    thumbnailHeight="15%"
                    images={images}
                    style={{
                      height: "350px",
                      width: "100%",
                      background: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box">
                <div className="product-info">
                  <p className="">
                    <Link
                      className="text-dark"
                      to={`/category/${product.category}`}
                    >
                      {product.brand}
                    </Link>
                  </p>
                  <div className="title-box">
                    <h1 className="title">{product.title}</h1>
                  </div>
                  <div className="price-box">
                    <div className="price">
                      <i className="p-1  fa-solid fa-dollar-sign"></i>
                      <span>{product.price}</span>
                    </div>
                    <div className="rating-box">
                      <span>
                        <AiFillStar className="rating" /> {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="product-info-quantity">
                  <div className="form-control form-control-p-info">
                    <label
                      htmlFor="product-form"
                      className=" text-subdued d-block"
                    >
                      Quantity: {product.quantity}
                    </label>
                    <div className="quantity-selector">
                      <button
                        type="button"
                        className="quantity-selector-btn"
                        aria-label="Decrease quantity"
                        onClick={() => handleIncrement(product.id)}
                      >
                        <svg
                          role="presentation"
                          focusable="false"
                          width="10"
                          height="2"
                          class="icon icon-minus"
                          viewBox="0 0 10 2"
                        >
                          <path d="M0 0H10V2H0V0Z" fill="currentColor"></path>
                        </svg>
                      </button>
                      <input
                        id="product-form"
                        type="text"
                        is="quantity-input"
                        inputmode="numeric"
                        class="quantity-selector__input"
                        name="quantity"
                        form="product-form-7759851225344-template--16687745499392__main"
                        size="2"
                        autocomplete="off"
                      >{product.quantity}</input>
                      <button
                        type="button"
                        className="quantity-selector-btn"
                        aria-label="Increase quantity"
                        onClick={() => handleDecrement(product.id)}

                      >
                        <svg
                          role="presentation"
                          focusable="false"
                          stroke-width="2"
                          width="10"
                          height="10"
                          class="icon icon-plus"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M6 0V12"
                            fill="none"
                            stroke="currentColor"
                          ></path>
                          <path
                            d="M0 6L12 6"
                            fill="none"
                            stroke="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="product-info-buy-buttons">
                  <form method="post" action="/cart/add">
                    <div className="v-stack gap-4">
                      <div className="product-info-btn-box">
                        <button
                          type="button"
                          className="add-cart-btn product-info-btn"
                          onClick={() => addToCartHandle(product)}
                        >
                          Add to cart
                        </button>
                        <button
                          type="button"
                          className="payment-btn product-info-btn"
                        >
                          Buy it now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="description-box">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{product.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="relatedProducts">
              <div className="section-header d-flex align-items-center justify-content-between">
                <div className="prose">
                  <h5 className="h5" reveal-on-scroll="true">
                    <split-lines>Related Products</split-lines>
                  </h5>
                </div>
                <Link to={`/category/${product.category}`} className="text-with-icon group">
                  <span className="reversed-link">View all</span>
                  <span className="circle-chevron group-hover:colors">
                    <svg
                      role="presentation"
                      focusable="false"
                      width={"5"}
                      height={"8"}
                      className="icon icon-chevron-right-small reverse-icon"
                      viewBox="0 0 5 8"
                    >
                      <path
                        d="m.75 7 3-3-3-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
              <Slider {...settings}>
                {relatedProducts?.map((item, index) => (
                  <div className="flashCard" key={index}>
                    <Link to={`/product/${item.id}`}>
                      <div className="img-div">
                        <img src={item.images[0]} alt="" />
                      </div>
                    </Link>
                    <div className="title-box">
                      <h6>{item.title.substring(0, 25)}</h6>
                    </div>
                    <div className="price-box p-3">
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
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
