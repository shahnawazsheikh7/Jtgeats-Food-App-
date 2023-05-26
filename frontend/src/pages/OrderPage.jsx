import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from '../components/Spinner';
import OrderCard from "../components/OrderCard"
import OrderCardDetails from '../components/OrderCardDetails';

const OrderPage = () => {
    const { order,loading } = useContext(AppContext);
  return (
    <div>
        <Navbar />
        <div className='padding order-container'>
        <h1 className='OrdersHeading padding'>Your Order Summary</h1>

        {
          loading?
            (<Spinner/>) :
            (order.userOrder && order.userOrder.products.map((item) => {
              return <OrderCardDetails key={item._id} item={item}></OrderCardDetails>
            }))

        }

        <div>
            {
                order.userOrder && 
                <div className='OrdersHeading flex-col'> 
                    <div><span>Total Order Value :</span> <span>₹{order.userOrder.orderValue}</span> </div>
                    <div><span>Order Status :</span> <span>{order.userOrder.status}</span></div>
                </div>
            }
        </div>

      </div>

        <Footer />
    </div>
  )
}

export default OrderPage