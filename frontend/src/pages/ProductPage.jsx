import React, { useEffect } from 'react'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import FoodCard from "../components/FoodCard"
import Navbar from "../components/Navbar"
import MainFoodCard from "../components/MainFoodCard"
import { useLocation } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const ProductPage = () => {
    const { product, loading,categoryMenu} = useContext(AppContext);
    const location = useLocation();
    return (
        <div>
            <Navbar></Navbar>
            {
                loading ?
                    (<Spinner />) :
                    (
                        <div>
                            <div className='padding'>
                                <FoodCard item={product} ></FoodCard>
                            </div>

                            {
                                categoryMenu ?
                                    (<div className='main-container padding '>
                                        <h2 className='main-heading'>You might also like</h2>
                                        <div className='main'>
                                            {
                                                categoryMenu.map((item) => {
                                                    return <MainFoodCard key={item._id} item={item} />
                                                })
                                            }

                                        </div>

                                    </div>) :
                                    (<div></div>)

                            }


                        </div>
                    )
            }

<Footer/>
        </div>
    )
}

export default ProductPage