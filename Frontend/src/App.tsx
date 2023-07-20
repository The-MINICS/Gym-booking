import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import ContactUs from "@/scenes/contact_us"
import Footer from "./scenes/footer";
import BeforeLogin from "./scenes/before_login";

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
    <>
      <div className="app bg-yellow-50">
        <Navbar
          isTopOfPage = {isTopOfPage}
          selectedPage = {selectedPage}
          setSelectedPage = {setSelectedPage}
        />
        <Home setSelectedPage = {setSelectedPage} />
        <Benefits setSelectedPage = {setSelectedPage} />
        {/* <OurClass setSelectedPage={setSelectedPage} /> */}
        {/* <Equipments setSelectedPage = {setSelectedPage} /> */}
        {/* <Booking setSelectedPage = {setSelectedPage} /> */}
        <ContactUs setSelectedPage = {setSelectedPage} />
        <Footer/>
      </div>
    </>
  )
}

export default App
