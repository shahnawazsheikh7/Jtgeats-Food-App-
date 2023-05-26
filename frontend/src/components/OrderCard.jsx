import React from 'react'
import { Link } from 'react-router-dom'

const OrderCard = (order) => {
  return (
    <Link to={`/user/order/${order.order._id}`}>
      <div className="orderCard md:w-50% sm:w-50% lg:flex">
        <p>Order Id : <span>{order.order._id}</span></p>
        <p>Order Status : <span>{order.order.status}</span></p>
      </div>
    </Link>

  )
}

export default OrderCard