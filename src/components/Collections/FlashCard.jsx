import React, { useEffect, useState } from "react";
import "./Cards.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const FlashCard = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);

  useEffect(() => {
    const api = `https://dummyjson.com/products?limit=100`;
    const getProduct = async () => {
      try {
        const res = await axios.get(api);
        setData(res.data.products);

        const categories = [
          "smartphones",
          "laptops",
          "fragrances",
          "lighting",
          "skincare",
          "groceries",
        ];
        const filteredMobileProducts = categories.map((category) => {
          const filteredItems = res.data.products.filter(
            (item) => item.category === category
          );
          return { category, items: filteredItems };
        });

        setMobileProducts(filteredMobileProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProduct();
  }, []);

  const addToCartHandle = (item) => {
    dispatch(
      cartActions.addItem({
        ...item,
        quantity: 1,
      })
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <div className="container-md flashcard">
      {mobileProducts.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div className="section-header d-flex align-items-center justify-content-between">
            <div className="prose">
              <h5 className="h5 text-uppercase fw-bold">
                <split-lines>{group.category}</split-lines>
              </h5>
            </div>
            <Link
              to={`/category/${group.category}`}
              className="text-with-icon group"
            >
              <span className="reversed-link fw-bold">View all</span>
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
                    strokeWidth={"1.5"}
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
          <Slider {...settings}>
            {group.items.map((item, i) => (
              <>
                <article className="card" key={i}>
                  <Link to={`/product/${item.id}`}>
                    <div className="card__img">
                      <img src={item.images[0]} alt="" />
                    </div>
                  </Link>

                  <div className="card__name">
                    <p>{item.title}</p>
                  </div>
                  <div className="card__precis">
                    <a href="" className="card__icon">
                      <ion-icon name="heart-outline"></ion-icon>
                    </a>

                    <div>
                      <span className="card__preci card__preci--before">
                        %{item.discountPercentage}
                      </span>
                      <span className="card__preci card__preci--now">
                        ${item.price}
                      </span>
                    </div>
                    <button className="btn-cart"
                      onClick={() => addToCartHandle(item)}
                    >
                      <span>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </span>
                    </button>
                  </div>
                </article>
              </>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default FlashCard;
