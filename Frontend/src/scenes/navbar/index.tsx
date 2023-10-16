import * as React from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo4.png"
import Link from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import user from '@/assets/user.png';

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const [show, setShow] = React.useState(false);
    const [members, setMembers] = React.useState<MemberInterface>({});
    const flexBetween = "flex items-center justify-between";
    const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
    const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false);
    const navbarBackground = isTopOfPage ? "" : "bg-red-200 drop-shadow";

    const ShowProfileMore = () => {
        if(show == true){
          setShow(false)
        }else{
          setShow(true)
        }
    }

    const signout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const GetMembers = async () => {
        let res = await GetMemberByMID();
        if (res) {
            setMembers(res);
        }
    };

    React.useEffect(() => {
        GetMembers();
    }, []);

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
                                    page= "Our Class"
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                                <Link 
                                    page= "Equipments" 
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                                <Link 
                                    page= "Booking"
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                                <Link 
                                    page= "Contact Us"
                                    selectedPage = {selectedPage}
                                    setSelectedPage = {setSelectedPage}
                                />
                            </div>
                            <div className= {`${flexBetween} gap-5 md:flex`}>
                                <button
                                    className="bg-yellow-500 rounded-3xl p-0.5 hover:bg-white"
                                >
                                    <button className="flex items-center active:scale-[.98] active:duration-75 
                                        transition-all hover:scale-[1.01] ease-in-out"
                                        onClick={ShowProfileMore}
                                        >
                                        <div className="">
                                            <img src={user} alt='user-logo' 
                                            className='h-10 w-10 object-cover border-4 border-yellow-500 rounded-full cursor-pointer'/>
                                        </div>
                                        { show && (
                                            <span className="p-1 text-base font-bold">
                                                {members.Username}·{members.Firstname} {members.Lastname}
                                            </span>
                                        )}
                                    </button>
                                </button>
                                <button className="bg-red-600 text-white hover:bg-red-500 p-1 rounded
                                    active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                                    onClick={signout}
                                >
                                    <div className="flex items-center">
                                    <span className="text-base font-bold">
                                        Sign Out
                                    </span>
                                    </div>
                                </button>
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

        {/* Mobile Menu */}
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
                        page= "Our Class"
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                        />
                    <Link 
                        page= "Equipments" 
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                    <Link 
                        page= "Booking"
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                    <Link 
                        page= "Contact Us"
                        selectedPage = {selectedPage}
                        setSelectedPage = {setSelectedPage}
                    />
                </div>
            </div>
        )}
    </nav>
} 

export default Navbar;