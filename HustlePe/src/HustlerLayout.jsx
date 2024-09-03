import React from 'react'
import { Outlet } from 'react-router-dom'
import HustlerHeader from './components/Client/Header/ClientHeader'
import Footer from './components/Footer/Footer'
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