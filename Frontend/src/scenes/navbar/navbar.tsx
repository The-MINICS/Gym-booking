import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo4.png"
import Link from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar1 = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const navbarBackground = isTopOfPage ? "" : "bg-red-200 drop-shadow"

    return <nav>
        <div className= {`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
            <div className= {`${flexBetween} mx-auto w-5/6`}>
                <div className= {`${flexBetween} w-full gap-16`}>
                    {/* left side */}
                    <img alt="logo" src= {Logo} />
                    {/* right side */}
                    {isAboveMediumScreens ? (
                        <div className= {`${flexBetween} w-full`}>
                            <div className= {`${flexBetween} gap-8 text-sm font-bold`}>
                                <Link 
                                    page= "Home"
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                                <Link 
                                    page= "Benefits"
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                                <Link 
                                    page= "Terms" 
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                            </div>
                            <div className= {`${flexBetween} gap-5`}>
                                <ActionButton setSelectedPage={setSelectedPage}>
                                    <div className="flex items-center">
                                        <i className="h-6 w-6 mr-2"><UserGroupIcon/></i>
                                        <span className="text-base font-bold">ENTER OUR SERVICES</span>
                                    </div>
                                </ActionButton>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="rounded-full bg-yellow-500 p-2"
                            onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>
        {/* {Mobile Menu Modal} */}
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-red-100
                drop-shadow-xl">
                {/* Close Icon */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-gray-400"/>
                    </button>
                </div>
                {/* Menu Items */}
                <div className= "ml-[33%] flex flex-col gap-10 text-2xl font-bold">
                    <Link 
                        page= "Home"
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                    <Link 
                        page= "Benefits"
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                    <Link 
                        page= "Terms" 
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                    <Link 
                        page= "Sign In" 
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                </div>
            </div>
        )}
    </nav>
} 

export default Navbar1;