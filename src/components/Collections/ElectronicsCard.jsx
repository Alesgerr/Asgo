import React, { useEffect, useState } from 'react'
import './Cards.css'
import axios from 'axios'
   import Slider from 'react-slick'
import { Link } from 'react-router-dom'

const ElectronicsCard = () => {
   const [data, setData] = useState([])
   const [mobileProduct, setMobileProduct] = useState([])
   useEffect(() => {
      const api = 'https://fakestoreapi.com/products';
    
      const getProduct = async () => {
        try {
          const res = await axios.get(api);
          setData(res.data);
    
          // Veriler alındıktan sonra filteredMobileProduct'ı hesapla
          const filteredMobileProduct = res.data.filter(
            (item) => item.category === 'electronics'
          );
          setMobileProduct(filteredMobileProduct);
        } catch (error) {
          console.error('Veri çekme hatası:', error);
        }
      };
    
      getProduct();
    }, []);
    
    console.log(mobileProduct);
    
   

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
      <div className="electronics">
         <section-header class="section-header d-flex align-items-center justify-content-between"><div class="prose"><h4 class="h4" reveal-on-scroll="true"><split-lines>Electronics</split-lines></h4></div><a href="/collections/all" class="text-with-icon group">
            <span className="reversed-link">View all</span>
            <span className="circle-chevron group-hover:colors"><svg role="presentation" focusable="false" width={"5"} height={"8"} className="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
            <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width={"1.5"}></path>
            </svg></span>
      </a></section-header>
         <Slider {...settings}>
            {mobileProduct && mobileProduct.map((item, index) => (
               <div className='flashCard' key={index}>
                  <Link to={`/product/${item.id}`}>
                     <div className="img-div">
                        <img src={item.image} alt="" />
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
  )
}

export default ElectronicsCard