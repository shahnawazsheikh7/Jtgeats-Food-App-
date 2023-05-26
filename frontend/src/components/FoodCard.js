import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const FoodCard = (item) => {
    const {addToCart} = useContext(AppContext);
    return (
            <div className="flex sm:flex-col-reverse md:flex-col-reverse w-full border-b mb-3 pb-5 lg:mx-20 ">
                <div className="flex-col w-2/3 p-4 sm:w-full md:w-full">
                    <div className="food-card-title">{item.item.title}</div>
                    <div className="food-card-price">₹{item.item.price}</div>
                    <div className="food-card-description">{item.item.description}</div>
                    
                </div>
                <div className="w-1/3 flex justify-center items-center p-4 sm:w-full md:flex-col-reverse md:w-full relative sm:justify-start md:justify-start">
                    <img src={item.item.image} alt="" className='food-card-image'/>
                    <button className='food-card-button absolute sm:left-14' onClick={()=>{addToCart(item.item._id)}}>Add</button>
                </div>
                
            </div>
        
        )
}

            export default FoodCard