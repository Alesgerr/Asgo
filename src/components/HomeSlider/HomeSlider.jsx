import React, { useState } from "react";
import Slider from "react-slick";
const HomeSlider = () => {
   
   const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const sliderArr = [
      {
         id: 1,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/noyabr2023/BF_macbookair3_1129x530_48f.jpg',
         category: 'laptops'

      },
      {
         id: 2,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/sentyabr2023/indi-al-slider_1129x530_48f.jpg',
         category: 'furniture'
         
      },
    
      {
         id: 3,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/noyabr2023/BF_iphone14_1129x530_48f.jpg',
         category: 'laptops'

      },
      {
         id: 4,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/noyabr2023/zero30-1_1129x530_48f.jpg',
         category: 'smartphones'

      }
    ]
  
  return (
    <div className="home-slider">
      <Slider {...settings}>
          {sliderArr?.map((item) => (
            <div key={item.id}  >
               <img className="home-slider-img" src={item.img} alt="" />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default HomeSlider;
