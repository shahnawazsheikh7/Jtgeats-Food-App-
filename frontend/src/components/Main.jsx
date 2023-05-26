import React from 'react'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Spinner from './Spinner';
import MainFoodCard from './MainFoodCard';

const Main = () => {
    const {allProducts,loading} = useContext(AppContext);
  return (
    <div className='flex-col items-center justify-center '>
      <h1 className='main-heading'>Our Menu</h1>
      <div className='main'>
      
        {
            loading?
            (<Spinner/>):
            (allProducts.map((item)=>{
                return <MainFoodCard key={item._id} item={item}/>
            }))
        }

    </div>
    </div>
    
  )
}

export default Main