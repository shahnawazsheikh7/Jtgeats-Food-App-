import React from 'react'
import Navbar from "../components/Navbar"

const SuccessPage = () => {
  return (
    <div>
      <Navbar/>
      <div className='mycontainer'>
        Payment Successful. Please check your order details above.
      </div>
    </div>
  )
}

export default SuccessPage