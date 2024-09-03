import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestHeader from './components/Guest/Header/GuestHeader'
import Footer from './components/Footer/Footer'
function GuestLayout() {
  return (
    <>
    <GuestHeader />
    <Outlet />
    <Footer />
    </>
  )
}

export default GuestLayout