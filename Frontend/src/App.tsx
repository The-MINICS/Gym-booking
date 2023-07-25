import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Home from "@/scenes/home";
import ContactUs from "@/scenes/contact_us"
import Footer from "./scenes/footer";
import BeforeLogin from "./scenes/before_login";
import Profile from "./scenes/profile";

function App() {
  const [selectedPage,setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!token) {
    return <BeforeLogin />;
  }

  return (
    <Router>
      <div>
        <div className="app bg-yellow-50">
          <Navbar 
            isTopOfPage = {isTopOfPage}
            selectedPage = {selectedPage}
            setSelectedPage = {setSelectedPage}
          />
          <Routes>
            <Route path="/" element={<Home setSelectedPage = {setSelectedPage} />}/>{}
            <Route path="/profile" element={<Profile />}/>{}
            {/* <Route path="/ourclass" element={<OurClass setSelectedPage = {setSelectedPage} />}/>{}
            <Route path="/equipments" element={<Equipments setSelectedPage = {setSelectedPage} />}/>{}
            <Route path="/booking" element={<Booking setSelectedPage = {setSelectedPage} />}/>{} */}
            <Route path="/contactus" element={<ContactUs setSelectedPage = {setSelectedPage} />}/>{}
          </Routes>

          <Footer/>
        </div>
      </div>
    </Router>
  )
}

export default App
