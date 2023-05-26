import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../context/AppContext"
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import LoginSpinner from "../components/LoginSpinner"

const LoginPage = () => {
  const navigate = useNavigate();
  const {loginFormData,handleLoginInputChange,submitLogin, loginLoading} = useContext(AppContext);
  return (
    <div>
        <Navbar></Navbar>
        <div className='sign-up-container'>
            <div className='formHeading'>
                <Link to="/">
                    <img className="nav-item-left" src="https://res.cloudinary.com/dsuuvzvnh/image/upload/v1684574137/Logo_zqnras.svg" alt="logo"/>
                </Link>
                Login for fast and easy food delivery
            </div>
            <form className='signUpForm' onSubmit={submitLogin}>

                <div className="signUpField">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter Your Email' value={loginFormData.email} onChange={handleLoginInputChange} />
                </div>


                <div className="signUpField">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Confirm Password' value={loginFormData.password} onChange={handleLoginInputChange} />
                </div>

                <button type='submit' className='signUpButton'>Login 
                {
                            loginLoading?(<LoginSpinner/>):(<div></div>)
                        } </button>
                        
            </form>
                       
            <div className='loginExtra'>
                <h3>Don't have an account?</h3>
                
                    <button className='signUpLoginbutton' onClick={()=>{navigate("/signup")}}>
                        Sign up
                    </button>
                
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default LoginPage