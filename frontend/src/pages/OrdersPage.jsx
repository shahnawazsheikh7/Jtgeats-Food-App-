import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import OrderCard from "../components/OrderCard"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const OrdersPage = () => {
  const { orders } = useContext(AppContext);
  // console.log(user.orders)
  return (

    <div>
      <Navbar />
      <div className='padding order-container'>
        <h1 className='OrdersHeading'>Your Orders</h1>

        {
          orders.length==0 ?
            (<div className=''>Your Orders List is empty</div>) :
            (orders.map((order) => {
              return <OrderCard key={order._id} order={order}></OrderCard>
            }))

        }

      </div>
      <Footer />
    </div>
  )
}

export default OrdersPage