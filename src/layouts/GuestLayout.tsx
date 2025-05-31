import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import GuestHeader from "../components/Guest/Header/GuestHeader";
function GuestLayout() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <GuestHeader />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default GuestLayout;
