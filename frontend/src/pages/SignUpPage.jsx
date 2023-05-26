import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../context/AppContext"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginSpinner from "../components/LoginSpinner"

const SignUpPage = () => {
    const navigate = useNavigate();
    const {submitSignUp, signUpformData, handleInputChange,loginLoading} =  useContext(AppContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className='sign-up-container'>
            <div className='formHeading'>
                <Link to="/">
                    <img className="signup-logo" src="https://res.cloudinary.com/dsuuvzvnh/image/upload/v1684574137/Logo_zqnras.svg" alt="logo"/>
                </Link>
                Sign up for fast and easy food delivery
            </div>
            <form className='signUpForm' onSubmit={submitSignUp}>

                <div className="signUpField">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' placeholder='Enter Your Full Name' value={signUpformData.name}  onChange={handleInputChange}/>
                </div>

                <div className="signUpField">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter Your Email' value={signUpformData.email} onChange={handleInputChange}/>
                </div>


                <div className="signUpField">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Confirm Password' value={signUpformData.password} onChange={handleInputChange}/>
                </div>

                <div className="signUpField">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' placeholder='Confirm Your Password' value={signUpformData.confirmPassword} onChange={handleInputChange} />
                </div>
                <button type='submit' className='signUpButton'>SignUp
                {
                            loginLoading?(<LoginSpinner/>):(<div></div>)
                        }</button>
            </form>
            <div className='loginExtra'>
                <h3>Already have an account?</h3>
                
                    <button className='signUpLoginbutton' onClick={()=>{navigate("/login")}}>
                        Login
                    </button>
                
            </div>

        </div>
        <Footer/>
        </div>
        
    )
}

export default SignUpPage