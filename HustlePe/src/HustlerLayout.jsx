import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import HustlerHeader from './components/Hustler/Header/HustlerHeader'
function ClientLayout() {
    return (
      <>
      <HustlerHeader />
      <Outlet />
      <Footer />
      </>
    )
  }
  
  export default ClientLayout