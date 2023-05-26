import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Categories from '../components/Categories';

const HomePage = () => {
  return (
    <div id='wrapper'>
      <Navbar/>
      <Hero/>            
      <Categories/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default HomePage