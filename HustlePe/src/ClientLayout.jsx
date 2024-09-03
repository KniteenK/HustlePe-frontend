import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from './components/Client/Header/ClientHeader'
import Footer from './components/Footer/Footer'
function ClientLayout() {
    return (
      <>
      <ClientHeader />
      <Outlet />
      <Footer />
      </>
    )
  }
  
  export default ClientLayout