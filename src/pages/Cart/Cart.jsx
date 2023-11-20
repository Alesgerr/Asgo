import React from "react";
import "./Cart.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { BsCart4 } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { cartActions } from "../../redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(state => state.cart.totalAmount);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const [product, setProduct] = useState([]);
  console.log(totalQuantity);
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(cart.cartItems);
  }, [cart]);
  console.log(totalPrice);
  const EmptyCart = () => {
    return (
      <div className="emptyCart">
        <div className="icon-box">
          <BsCart4 />
        </div>
        <div className="emptyCart-title">
          <h3>Empty Cart</h3>
        </div>
        <Link className="text-decoration-none" to="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  };

  return (
    <div className="container">
      {product.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="row g-3">
          <div className="breadcrumb">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink>Shopping Cart</NavLink>
              </li>
            </ul>
          </div>
          <h1 className="shopping-cart-head">Shopping Cart</h1>
          <div className="col-lg-8">
            <div className="test">
              <div className="cart-all">
                {product?.map((item) => {
                  return (
                    <div key={item.id}>
                      <div className="cart">
                        <div className="cart-img-box">
                          <Link to={`/product/${item.id}`}>
                            <div className="cart-img">
                              <img src={item.image[0]} alt="" />
                            </div>
                          </Link>
                        </div>
                        <div className="cart-details w-75">
                          <div className="row">
                            <div className="col-md-6 col-9 d-flex align-items-center">
                              <div className="cart-title">
                                <Link>
                                  <p>{item.title}</p>
                                </Link>
                              </div>
                            </div>
                            <div className="col-md-6 col-3">
                              <div className="cart-body">
                                <div className="cart-quantity quantity-selector">
                                  <button onClick={() => dispatch(cartActions.decrementItem(item.id))}>-</button>
                                  <span>{item.quantity}</span>
                                  <button onClick={() => dispatch(cartActions.incrementItem(item.id))}>+</button>
                                </div>
                                <div className="cart-price">
                                  <p>
                                    <span>${item.price}</span>
                                  </p>
                                </div>
                                <div className="cart-delete">
                                  <button onClick={() => dispatch(cartActions.removeItem(item.id))}>
                                    <RiDeleteBin5Line />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="detail-mobile">
                              <div className="detail-mob-quantity quantity-selector">
                              <button className="quantity-selector-btn" onClick={() => dispatch(cartActions.decrementItem(item.id))}>-</button>
                                  <span>{item.quantity}</span>
                                  <button className="quantity-selector-btn" onClick={() => dispatch(cartActions.incrementItem(item.id))}>+</button>
                              </div>
                              <p>
                                <span>${item.price}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {product.length !== 0 && (
            <div className="col-lg-4">
              {/* <h5>Sebetdeki Mehsullar</h5> */}
                <div className="wrapper">
                  {/* Her bir ürünün bilgisi */}
                  <div className="about">
                    <div className="price">
                      <p>Total Quantity :</p>
                      <p>{totalQuantity}</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Subtotal :</p>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="checkout">
                {/* {user ? ( */}
                  {/* <div>
                    <Link><button>Sifarişi Rəsmiləşdir</button></Link>
                  </div> */}
                {/* ) : ( */}
                  <div className="cart-checkout">
                    <Link to='/checkout'><button type="button" className="checkout-btn cart-btn">Place an order</button></Link>
                  </div>
                {/* )} */}
              </div>
                </div>
              
              {/* Siparişi rəsmiləşdirme düğmesi */}
              
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
