import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Skeleton from "react-loading-skeleton";

const Categories = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
   //  const allowedCategories = [
   //    "smartphones",
   //    "laptops",
   //    "home-decoration",
   //    "furniture",
   //  ];
   //  const filteredCategories = data.filter((category) =>
   //    allowedCategories.includes(category)
   //  );
    setDatas(data);
    setLoading(false)
  };
  const categoryImageUrls = {
   "smartphones": "https://i.dummyjson.com/data/products/2/1.jpg",
   "laptops": "https://i.dummyjson.com/data/products/7/1.jpg",
   "fragrances": "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
   "skincare": "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
   "groceries": "https://i.dummyjson.com/data/products/23/thumbnail.jpg",
   "home-decoration": "https://i.dummyjson.com/data/products/27/thumbnail.webp",
   "furniture": "https://i.dummyjson.com/data/products/32/thumbnail.jpg",
   "tops": "https://i.dummyjson.com/data/products/40/thumbnail.jpg",
   "womens-dresses": "https://i.dummyjson.com/data/products/44/thumbnail.jpg",
   "womens-shoes": "https://i.dummyjson.com/data/products/47/thumbnail.jpeg",
   "mens-shirts": "https://i.dummyjson.com/data/products/54/thumbnail.jpg",
   "mens-shoes": "https://i.dummyjson.com/data/products/60/thumbnail.jpg",
   "mens-watches": "https://i.dummyjson.com/data/products/62/thumbnail.jpg",
   "womens-watches": "https://i.dummyjson.com/data/products/70/thumbnail.jpg",
   "womens-bags": "https://i.dummyjson.com/data/products/72/thumbnail.webp",
   "womens-jewellery": "https://i.dummyjson.com/data/products/78/thumbnail.jpg",
   "sunglasses": "https://i.dummyjson.com/data/products/84/thumbnail.jpg",
   "automotive": "https://i.dummyjson.com/data/products/88/thumbnail.jpg",
   "motorcycle": "https://i.dummyjson.com/data/products/94/thumbnail.webp",
   "lighting": "https://i.dummyjson.com/data/products/100/thumbnail.jpg",
 };
  useEffect(() => {
    fetchData();
  }, []);
  const pageTitle = 'Explore Our Categories - Find Products You Love';
  const pageDescription = 'Browse through our wide range of product categories and discover your favorite items.';
  const Loading = () => {
    return(
       <>
       <div className='skeleton-loading'>
           <div className="container-md">
            <div className='row g-1'>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
  
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
                <div className='col-md-3 col-sm-4 col-6'>
                  <Skeleton height={200} style={{width: "100%", height: "max-content"}}/>
                </div>
            </div>
           </div>
       </div>
     </>
    )
    }
  return (
    <div className="mt-3">
       <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="container">
        {loading ? <Loading /> : <div className="row g-2">
          {datas?.map((item, i) => (
            <div className="col-lg-3 col-md-4 col-6" key={i}>
              <Link to={`/category/${item}`}>
                <div className="home-cat home-categories">
                  <div className="box-img">
                    <img
                      className="w-100"
                      src={categoryImageUrls[item]}
                      alt=""
                    />
                    <div className="box">
                      <div className="box-title">{item}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default Categories;
