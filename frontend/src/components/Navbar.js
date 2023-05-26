import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { cart, user, signOut } = useContext(AppContext);
    return (
        <div className='-bg--myGreen w-full justify-between px-20 py-5 items-center sm:flex md:flex lg:flex sm:px-10 h-[50px]'>
            <div>
                <Link to="/">
                    <img src="https://res.cloudinary.com/dsuuvzvnh/image/upload/v1684574137/Logo_zqnras.svg" alt="logo" />
                </Link>
            </div>
            <div className="flex gap-5">
                {
                    user?
                    (<div className='items-center flex gap-5'>
                        <p className='text-white'>
                          <Link to="/orders">Orders</Link>
                        </p>
                           <button className='signoutButton' onClick={signOut}>Sign Out</button>
                           
                        
                    </div>):
                    (<div>
                            <p className='text-white'>
                           <Link to="/signup">Signup</Link>
                               </p>
                    </div>)
                }
                <Link to="/cart">
                    <img className="" src="https://res.cloudinary.com/dsuuvzvnh/image/upload/v1684574137/Cart_u7nisv.svg" alt="cart icon" />
                    <div className='cartDotContainer'>
                        {
                            cart.length === 0 ?
                                (<div></div>) :
                                (<div className="cartDot"></div>)
                        }

                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Navbar