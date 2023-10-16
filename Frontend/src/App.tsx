import '@/Components/Dropdown.css';
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
import Services from "./Components/pages/services";
import Profile from "./Components/pages/account_information/profile";
import BookingSCH from "./Components/pages/booking_schedule/booking_schedule";
import AdminTools from "./Components/pages/admin";
import ComplaintHandling from "./Components/pages/admin/admin_complaint_handling/Complaint_control";
import RoomManagement from "./Components/pages/admin/admin_room_control/room_control";
import EquipmentManagement from "./Components/pages/admin/admin_equipmemt_control";
import MemberManagement from "./Components/pages/admin/admin_member_control/member_control";
import MemberUpdate from "./Components/pages/admin/admin_member_control/member_update";
import PictureEquipmentUpdate from "./Components/pages/admin/admin_equipmemt_control/picture_update";
import EquipmentUpdate from "./Components/pages/admin/admin_equipmemt_control/equipment_update";
import RoomUpdate from './Components/pages/admin/admin_room_control/room_update';
import EquipmentBookingCreate from './Components/pages/equipment_booking/EQbooking-create';
import AccountSettings from './Components/pages/account_information';
import BookingManagement from './Components/pages/admin/admin_book_handle';

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
        <Route path='/bookings' element={<Booking/>}/> {}
        <Route path='/account-setting' element={<AccountSettings/>}/> {}
        <Route path='/profile' element={<Profile/>}/> {}
        <Route path='/bookingsch' element={<BookingSCH/>}/> {}
        <Route path='/admin-tools' element={<AdminTools/>}/> {}
        <Route path='/member-manage' element={<MemberManagement/>}/> {}
        <Route path='/equipment-manage' element={<EquipmentManagement/>}/> {}
        <Route path='/room-mannage' element={<RoomManagement/>}/> {}
        <Route path='/booking-management' element={<BookingManagement/>}/> {}
        <Route path='/complaint-handle' element={<ComplaintHandling/>}/> {}
        <Route path="/member/update/:id" element={<MemberUpdate/>}/> {}
        <Route path="/picture/update/:id" element={<PictureEquipmentUpdate/>}/> {}
        <Route path="/equipment/update/:id" element={<EquipmentUpdate/>}/> {}
        <Route path="/room/update/:id" element={<RoomUpdate/>}/> {}
        <Route path="/equipmentbooking-create" element={<EquipmentBookingCreate/>}/> {}
      </Routes>
      <Footer />
  </Router>
  )
}

export default App
