import Navbar2 from "@/Components/Navbar2"
import { useEffect, useState } from "react";
import Home from "@/Components/Home2";
import ContactUs from "@/Components/pages/contact_us"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./scenes/footer";
import BeforeLogin from "./scenes/before_login";
import Booking from "./Components/pages/booking";
import Recreations from "./Components/pages/recreation_room";
import Equipments from "./Components/pages/equipment";
import Member from "./Components/pages/member";
import Programs from "./Components/pages/programs";
import Services from "./Components/pages/services";
import Profile from "./Components/pages/profile";
import ChangePSW from "./Components/pages/member/change_password";
import BookingSCH from "./Components/pages/member/booking_schedule";

function App() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  
  if (!token) {
    return <BeforeLogin />;
  }

  return (
    <Router>
      <Navbar2 />
      <Routes>
        <Route path='/' element={<Home/>}/> {}
        <Route path='/members' element={<Member/>}/> {}
        <Route path='/services' element={<Services/>}/> {}
        <Route path='/contact-us' element={<ContactUs/>}/> {}
        <Route path='/equipments' element={<Equipments/>}/> {}
        <Route path='/recreations' element={<Recreations/>}/> {}
        <Route path='/programs' element={<Programs/>}/> {}
        <Route path='/bookings' element={<Booking/>}/> {}
        <Route path='/profile' element={<Profile/>}/> {}
        <Route path='/chpassword' element={<ChangePSW/>}/> {}
        <Route path='/bookingsch' element={<BookingSCH/>}/> {}
      </Routes>
      <Footer />
  </Router>
  )
}

export default App
