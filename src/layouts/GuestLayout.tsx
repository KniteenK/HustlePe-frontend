import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import GuestHeader from '../components/Guest/Header/GuestHeader';
function GuestLayout() {
  return (
    <>
    <GuestHeader />
    <Outlet />
    <Footer />
    </>
  )
}

export default GuestLayout;