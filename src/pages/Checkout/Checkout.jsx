import React from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
const Checkout = () => {
   const totalQty = useSelector(state => state.cart.totalQuantity)
   const totalAmount = useSelector(state => state.cart.totalAmount)
  return (
    <div className='checkout'>
      <div className="container">
         <div className="row g-2">
            <h6 className='fw-bold'>Billing Information</h6>
            <div className="col-lg-8">
               <div className="checkout-div">
                  <form>
                     <div className="form-group">
                        <input type="text" placeholder='Enter your name'/>
                     </div>
                     <div className="form-group">
                        <input type="email" placeholder='Enter your email'/>
                     </div>
                     <div className="form-group">
                        <input type="number" placeholder='Phone number'/>
                     </div>
                     <div className="form-group">
                        <input type="text" placeholder='Street address'/>
                     </div>
                     <div className="form-group">
                        <input type="text" placeholder='City'/>
                     </div>
                     <div className="form-group">
                        <input type="text" placeholder='Postal code'/>
                     </div>
                     <div className="form-group">
                        <input type="text" placeholder='Country'/>
                     </div>
                  </form>
               </div>
            </div>
            <div className="col-lg-4">
               <div className="checkout-div">
                  <div className="checkout-cart">
                     <h6>Total Qty: <span>{totalQty} items</span></h6>
                     <h6>Subtotal: <span>${totalAmount}</span></h6>
                     <h6>Shipping: <br /> Free Shipping <span>$20</span></h6>
                     <h4>Total Cost: <span>${totalAmount}</span></h4>
                  </div>
                  <div className="checkout-btn-cart">
                     <button className='buy-btn'>
                        Place an order
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Checkout