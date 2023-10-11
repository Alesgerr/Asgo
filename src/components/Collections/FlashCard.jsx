import React, { useEffect, useState } from 'react'
import './Cards.css'
import axios from 'axios'
   import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
const MensClothingCard = () => {
   const [data, setData] = useState([])
   const [mobileProduct, setMobileProduct] = useState([])
   const [mobileProduct2, setMobileProduct2] = useState([])
   const [mobileProduct3, setMobileProduct3] = useState([])
   const [mobileProduct4, setMobileProduct4] = useState([])
   useEffect(() => {
      const api = `https://dummyjson.com/products`;
      const getProduct = async () => {

          const res = await axios.get(api);
          console.log(res);
          setData(res.data.products);
          // Veriler alındıktan sonra filteredMobileProduct'ı hesapla
          const filteredMobileProduct = res.data.products.filter(
            (item) => item.category === "smartphones"
          );
          const filteredMobileProduct2 = res.data.products.filter(
            (item) => item.category === "laptops"
          );
          const filteredMobileProduct3 = res.data.products.filter(
            (item) => item.category === "fragrances"
          );
          const filteredMobileProduct4 = res.data.products.filter(
            (item) => item.category === "home-decoration"
          );
          setMobileProduct(filteredMobileProduct);
          setMobileProduct2(filteredMobileProduct2)
          setMobileProduct3(filteredMobileProduct3)
          setMobileProduct4(filteredMobileProduct4)
        } 
    
      getProduct();
    }, []);

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
             dots: true
           }
         },
         {
           breakpoint: 600,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             initialSlide: 2
           }
         },
         {
           breakpoint: 480,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 1
           }
         }
       ]
    };
   return (
     <div className='container'>
      <div className="electronics">
         <div className="section-header d-flex align-items-center justify-content-between"><div className="prose"><h5 className="h5" reveal-on-scroll="true"><split-lines>Smartphones</split-lines></h5></div><a href="/collections/all" className="text-with-icon group">
            <span className="reversed-link">View all</span>
            <span className="circle-chevron group-hover:colors"><svg role="presentation" focusable="false" width={"5"} height={"8"} className="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
            <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth={"1.5"}></path>
            </svg></span>
      </a></div>
         <Slider {...settings}>
            {mobileProduct?.map((item, index) => (
               <div className='flashCard' key={index}>
                  <Link to={`/product/${item.id}`}>
                     <div className="img-div">
                        <img src={item.images[0]} alt="" />
                     </div>
                  </Link>
                  <div className="title-box">
                     <h6>{item.title.substring(0,25)}</h6>
                  </div>
                  <div className="rating-box">
                     <span><AiFillStar className='rating'/> {item.rating}</span>
                  </div>
                  <div className="price-box">
                     <p className='price-item'>
                     <span>{item.price}</span>
                     <i className="p-1  fa-solid fa-dollar-sign"></i>
                     </p>
                     <div className="btn-box">
                     
                     <button className='btn-cart'>
                        <span><i className="fa-solid fa-cart-shopping"></i></span>
                     </button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
      <div className="jewelry">
         <div className="section-header d-flex align-items-center justify-content-between"><div className="prose"><h5 className="h5" reveal-on-scroll="true"><split-lines>Laptops</split-lines></h5></div><a href="/collections/all" className="text-with-icon group">
            <span className="reversed-link">View all</span>
            <span className="circle-chevron group-hover:colors"><svg role="presentation" focusable="false" width={"5"} height={"8"} className="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
            <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            </svg></span>
      </a></div>
         <Slider {...settings}>
            {mobileProduct2?.map((item, index) => (
               <div className='flashCard' key={index}>
                  <Link to={`/product/${item.id}`}>
                     <div className="img-div">
                        <img src={item.images[0]} alt="" />
                     </div>
                  </Link>
                  <div className="title-box">
                     <h6>{item.title.substring(0,25)}</h6>
                  </div>
                  <div className="price-box">
                     <p className='price-item'>
                     <span>{item.price}</span>
                     <i className="p-1  fa-solid fa-dollar-sign"></i>
                     </p>
                     <div className="btn-box">
                     <button className='btn-cart'>
                        <span><i className="fa-solid fa-cart-shopping"></i></span>
                     </button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
      <div className="mens-clothing">
         <div className="section-header d-flex align-items-center justify-content-between"><div className="prose"><h5 className="h5" reveal-on-scroll="true"><split-lines>Fragrances</split-lines></h5></div><a href="/collections/all" className="text-with-icon group">
            <span className="reversed-link">View all</span>
            <span className="circle-chevron group-hover:colors"><svg role="presentation" focusable="false" width={"5"} height={"8"} className="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
            <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            </svg></span>
      </a></div>
         <Slider {...settings}>
            {mobileProduct3?.map((item, index) => (
               <div className='flashCard' key={index}>
                  <Link to={`/product/${item.id}`}>
                     <div className="img-div">
                        <img src={item.images[0]} alt="" />
                     </div>
                  </Link>
                  <div className="title-box">
                     <h6>{item.title.substring(0,25)}</h6>
                  </div>
                  <div className="price-box">
                     <p className='price-item'>
                     <span>{item.price}</span>
                     <i className="p-1  fa-solid fa-dollar-sign"></i>
                     </p>
                     <div className="btn-box">
                     <button className='btn-cart'>
                        <span><i className="fa-solid fa-cart-shopping"></i></span>
                     </button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
      <div className="womens-clothing">
         <div className="section-header d-flex align-items-center justify-content-between"><div className="prose"><h5 className="h5" reveal-on-scroll="true"><split-lines>Home Decoration</split-lines></h5></div><a href="/collections/all" className="text-with-icon group">
            <span className="reversed-link">View all</span>
            <span className="circle-chevron group-hover:colors"><svg role="presentation" focusable="false" width={"5"} height={"8"} className="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
            <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            </svg></span>
      </a></div>
         <Slider {...settings}>
            {mobileProduct4?.map((item, index) => (
               <div className='flashCard' key={index}>
                  <Link to={`/product/${item.id}`}>
                     <div className="img-div">
                        <img src={item.images[0]} alt="" />
                     </div>
                  </Link>
                  <div className="title-box">
                     <h6>{item.title.substring(0,25)}</h6>
                  </div>
                  <div className="price-box">
                     <p className='price-item'>
                     <span>{item.price}</span>
                     <i className="p-1  fa-solid fa-dollar-sign"></i>
                     </p>
                     <div className="btn-box">
                     <button className='btn-cart'>
                        <span><i className="fa-solid fa-cart-shopping"></i></span>
                     </button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
     </div>
  )
}

export default MensClothingCard