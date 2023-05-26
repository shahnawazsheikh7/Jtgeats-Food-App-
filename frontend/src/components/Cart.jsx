import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'
import CartItem from './CartItem'
const Cart = () => {
    const {cart,loading} = useContext(AppContext);
  return (
    <div className='cart'>
        {
            loading?
            (<Spinner/>):
            (cart.map((item)=>{
                return <CartItem key={item._id} item={item}/>
              }))
        
        }
    </div>
  )
}

export default Cart