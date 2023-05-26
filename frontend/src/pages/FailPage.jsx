import React from 'react'
import Navbar from "../components/Navbar"

const FailPage = () => {
  return (
    <div>
      <Navbar/>
      <div className='mycontainer'>
        Oops Payment Failed. Please try again later. If any money is deducted from your bank it will be automatically refunded to your bank within 7 working days.
      </div>
    </div>
  )
}

export default FailPage