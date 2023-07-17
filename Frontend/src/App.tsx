import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import ContactUs from "@/scenes/contact_us"
import Footer from "./scenes/footer";

function App() {
  const [selectedPage,setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
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
        {/* <Equipments setSelectedPage = {setSelectedPage} />
        <Booking setSelectedPage = {setSelectedPage} /> */}
        <ContactUs setSelectedPage = {setSelectedPage} />
        <Footer/>
      </div>
    </>
  )
}

export default App
