import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'

const CategoryDetail = () => {
  const {id} = useParams()
  const [product, setProduct] = useState([])
  useEffect(() => {
    const getProduct = async () => {
       const res = await axios.get(`https://dummyjson.com/products/category/${id}`)
       setProduct(res.data.products)
    }
    getProduct()
    
 },[id])
 console.log(product);
  return (
    <div className="category-detail mt-3">
      <div className="container">
        <div className='row g-3'>
        {product?.map((item) => (
          <div className="col-lg-3 col-md-4 col-12" key={item.id}>
            <div className='flashCard'>
              <Link to={`/product/${item.id}`}>
                  <div className="img-div">
                    <img src={item.thumbnail} alt="" />
                  </div>
              </Link>
              <div className="title-box">
                  <h6>{item.title}</h6>
              </div>
              <div className="rating-box">
                  <span><AiFillStar className='rating' /> {item.rating}</span>
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
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryDetail