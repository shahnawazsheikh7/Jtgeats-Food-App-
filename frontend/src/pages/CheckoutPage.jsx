import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import LoginSpinner from "../components/LoginSpinner"

const CheckoutPage = () => {
  const { cart, cartTotal, checkout, loginLoading,buyNow } = useContext(AppContext);
  return (
    <div>
      <Navbar></Navbar>
      <div className='checkoutcontainer'>
      <div className='checkoutCard'>
      <h1 className='main-heading'>Your order summary</h1>
        <div className='cart-info'>
          <div className='cart-details'>
            {
              cart && cart.map((item) => {
                return (<div className='cart-items-details'>
                  <p className='cart-info-item-title'>{item.title}</p>
                  <p>₹{item.price}</p>
                </div>)
              })
            }
          </div>
          <div className='cart-total'>
            <p className='cart-info-item-title'>Total:</p>
            <p>₹{cartTotal}</p>
          </div>
        <button className='cart-checkout-button' onClick={buyNow}>Buy Now 
        {
                            loginLoading?(<LoginSpinner/>):(<div></div>)
                        } </button>
        </div>

      </div>
      </div>
      
      <Footer/>
    </div>

  )
}

export default CheckoutPage