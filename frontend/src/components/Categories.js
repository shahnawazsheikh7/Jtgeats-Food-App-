import React from 'react'
import Category from './Category';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { categories} = useContext(AppContext);
  return (
    <div className='categories padding'>
      { categories &&
        categories.map((categ)=>{
          return <Category key={categ._id} categ={categ}/>
        })
      }
    </div>
  )
}

export default Categories