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
import WorkoutPrograms from "./Components/pages/workout_program";
import Services from "./Components/pages/services";
import Profile from "./Components/pages/profile_user";
import ChangePSW from "./Components/pages/member/change_password";
import BookingSCH from "./Components/pages/member/booking_schedule";
import AccountSettings from "./Components/pages/account_settings";
import AdminTools from "./Components/pages/admin";
import ComplaintHandling from "./Components/pages/admin/complaint_handle";
import RoomManagement from "./Components/pages/admin/room_control";
import EquipmentManagement from "./Components/pages/admin/equipment_control";
import MemberManagement from "./Components/pages/admin/member_control";
import '@/Components/Dropdown.css';

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
        <Route path='/programs' element={<WorkoutPrograms/>}/> {}
        <Route path='/bookings' element={<Booking/>}/> {}
        <Route path='/profile' element={<Profile/>}/> {}
        <Route path='/chpassword' element={<ChangePSW/>}/> {}
        <Route path='/bookingsch' element={<BookingSCH/>}/> {}
        <Route path='/accountsettings' element={<AccountSettings/>}/> {}
        <Route path='/admin-tools' element={<AdminTools/>}/> {}
        <Route path='/member-manage' element={<MemberManagement/>}/> {}
        <Route path='/equipment-manage' element={<EquipmentManagement/>}/> {}
        <Route path='/class-mannage' element={<RoomManagement/>}/> {}
        <Route path='/complaint-handle' element={<ComplaintHandling/>}/> {}
      </Routes>
      <Footer />
  </Router>
  )
}

export default App
