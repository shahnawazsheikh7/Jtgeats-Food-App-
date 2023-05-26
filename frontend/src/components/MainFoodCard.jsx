import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const MainFoodCard = (item) => {
    const {addToCart} = useContext(AppContext);
  return (
    <div>
        
           <div className="main-food-card">
                <div className="main-food-card-top">
                <Link to={`/category/${item.item.category}/product/${item.item._id}`} style={{ textDecoration: 'none' }}>
                    <img src={item.item.image} alt="" className='food-card-image'/>
                    </Link>
                </div>
                <div className="main-food-card-bottom">
                    <div className="food-card-title">{item.item.title}</div>
                    <div className="food-card-price">₹{item.item.price}</div>
                    <button className='main-food-card-button' onClick={()=>{addToCart(item.item._id)}}>Add</button>
                    {/* <div className="food-card-description">{item.item.description}</div> */}
                    
                </div>
                
            </div>

        
    </div>
  )
}

export default MainFoodCard