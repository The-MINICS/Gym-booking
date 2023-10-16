import { useEffect, useState } from "react";
import { SelectedPage } from '@/shared/types'
import Home1 from '../home/home';
import Benefits from '../benefits';
import Footer from '../footer';
import Navbar1 from '../navbar/navbar';
import Terms from '../terms';
import SignIn from "../sign_in";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "../forgot_password/new_password";


function BeforeLogin() {
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
                <Navbar1
                isTopOfPage = {isTopOfPage}
                selectedPage = {selectedPage}
                setSelectedPage = {setSelectedPage}
                />
                <Home1 setSelectedPage = {setSelectedPage} />
                <Benefits setSelectedPage = {setSelectedPage} />
                <Terms setSelectedPage = {setSelectedPage} />
                <SignIn setSelectedPage={setSelectedPage} />
                <Routes>
                  <Route path="/resetpassword" element={< ResetPassword/>}/> {}
                </Routes>
                <Footer/>
            </div>
        </>
    )
}

export default BeforeLogin