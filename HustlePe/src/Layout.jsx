import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Client/Header/Header'
import Footer from './components/Footer/Footer'
function Layout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout