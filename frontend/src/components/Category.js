import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({categ}) => {
  return (
      <Link to={`/menu/${categ._id}`}>
          <div className='w-[150px]'>
          <img src={categ.image} alt="" className='category_image'/>
          </div>
      </Link>
    
  )
}

export default Category