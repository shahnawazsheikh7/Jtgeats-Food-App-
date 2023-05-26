import React, { useState, useEffect } from 'react'
import FoodCard from './FoodCard';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from '../components/Spinner';

const MenuItems = () => {

    const {categoryMenu,loading} = useContext(AppContext);
    

  return (
    <div className='food-card-section'>
        {
            loading?
            (<Spinner/>):
            ( categoryMenu && categoryMenu.map((item)=>{
                return <FoodCard key={item._id} item={item}/>
              }))
        
      }
        
    </div>
  )
}

export default MenuItems