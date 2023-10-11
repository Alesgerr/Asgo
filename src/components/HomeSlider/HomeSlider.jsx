import React, { useState } from "react";
import Slider from "react-slick";
const HomeSlider = () => {
   const settings = {
      dots: true,
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
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/sentyabr2023/indi-al-slider_1129x530_48f.jpg'
      },
      {
         id: 2,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/oktyabr2023/530samsung_1129x530_48f.jpg'
      },
      {
         id: 3,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/sentyabr2023/philips-slider_1129x530_48f.jpg'
      },
      {
         id: 4,
         img: 'https://www.bakuelectronics.az/assets/cache_image/slider/sentyabr2023/lg-apple-slider_1129x530_48f.jpg'
      }
    ]
  return (
    <div className="home-slider">
      <Slider {...settings}>
          {sliderArr?.map((item) => (
            <div key={item.id}>
               <img className="img-fluid" src={item.img} alt="" />
            </div>
          ))}
        </Slider>
    </div>
  );
};

export default HomeSlider;
