import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const CartItem = (item) => {
    const {removeFromCart} = useContext(AppContext);
  return (
        <div className="cart-item">
                <div className="cart-item-left">
                    <img src={item.item.image} alt="" className='food-card-image'/>
                </div>
                <div className="cart-item-center">
                    <div className="food-card-title">{item.item.title}</div>
                    <div className="food-card-price">₹{item.item.price}</div>   
                </div>
                <div className="cart-item-right">
                <button className='cart-item-button' onClick={()=>{removeFromCart(item.item._id)}}>Remove</button>  
                </div>
                
        </div>
  )
}

export default CartItem