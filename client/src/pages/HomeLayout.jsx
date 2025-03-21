import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import '../app.css'

const HomeLayout = () => {
  return (
        <>
          <Header/>
          <Outlet/> 
          <Footer/>
        </>
  )
}

export default HomeLayout