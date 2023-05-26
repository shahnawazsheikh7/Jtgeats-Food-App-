import React from 'react'
import Navbar from '../components/Navbar'
import Cart from "../components/Cart"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, cartTotal, handleCheckOut } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <div className='cart-container'> 
        {
          cart.length == 0 ?
            (
              <div className='mycontainer'>
                OOPS!!! EMPTY BASKET
              </div>
            ) :
            (
              <div className='cart-container'>
                <Cart />
                <div className='cart-info'>
                <h1 className='main-heading'>Your Basket</h1>
                  <div className='cart-details'>
                    {
                      cart.map((item) => {
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

                  <button className='cart-checkout-button' onClick={handleCheckOut}>Proceed To Checkout</button>
                </div>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default CartPage