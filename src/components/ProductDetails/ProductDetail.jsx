import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetail.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {AiFillStar} from 'react-icons/ai'
const ProductDetail = () => {
   const {id} = useParams()
   const [product, setProduct] = useState([])
   useEffect(() => {
      const getProduct = async () => {
         const res = await axios.get(`https://dummyjson.com/products/${id}`)
         setProduct(res.data)
      }
      getProduct()
      
   },[id])
   console.log(product);

  return (
    <div className='product-detail'>
      <div className="container">
         <div className="row">
            <div className="col-lg-6">
               <div className="box">
                  <div className="img-box">
                     {product.images && product.images.length > 0 ? (
                     <img src={product.images[1]} alt="" />
                     ) : (
                     <p>Product image not available.</p>
                     )}
                  </div>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="box">
                  <div className="product-info">
                     <p className=''>{product.brand}</p>
                     <div className="title-box">
                        <h1 className='title'>{product.title}</h1>
                        
                     </div>
                     <div className="price-box">
                        <div className="price">
                           <i className="p-1  fa-solid fa-dollar-sign"></i>
                           <span>{product.price}</span>
                        </div>
                        <div className="rating-box">
                           <span><AiFillStar className='rating' /> {product.rating}</span>
                        </div>
                     </div>
                  </div>
                  <div className="product-info-quantity">
                     <div className="form-control form-control-p-info">
                     <label htmlFor="product-form" className=" text-subdued d-block">Quantity:</label>
                     <div className="quantity-selector">
                        <button type="button" className="quantity-selector-btn" aria-label="Decrease quantity"><svg role="presentation" focusable="false" width="10" height="2" class="icon icon-minus" viewBox="0 0 10 2">
                           <path d="M0 0H10V2H0V0Z" fill="currentColor"></path></svg>
                        </button>
                        <input id="product-form" type="text" is="quantity-input" inputmode="numeric" class="quantity-selector__input" name="quantity" form="product-form-7759851225344-template--16687745499392__main" size="2" value="1" autocomplete="off"></input>
                        <button type="button" className="quantity-selector-btn" aria-label="Increase quantity"><svg role="presentation" focusable="false" stroke-width="2" width="10" height="10" class="icon icon-plus" viewBox="0 0 12 12">
                           <path d="M6 0V12" fill="none" stroke="currentColor"></path><path d="M0 6L12 6" fill="none" stroke="currentColor"></path></svg>
                        </button>
                     </div>
                     </div>
                  </div>
                  <div className="product-info-buy-buttons">
                     <form method='post' action='/cart/add'>
                        <div className="v-stack gap-4">
                           <div className="product-info-btn-box">
                              <button type='button' className="add-cart-btn product-info-btn">Add to cart</button>
                              <button type='button' className="payment-btn product-info-btn">Buy it now</button>
                           </div>
                        </div>
                     </form>
                  </div>
                  <div className="description-box">
                     <Accordion>
                        <AccordionSummary
                           aria-controls="panel1a-content"
                           id="panel1a-header"
                           
                        >
                           <Typography>Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>
                           {product.description}
                           </Typography>
                        </AccordionDetails>
                     </Accordion>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default ProductDetail