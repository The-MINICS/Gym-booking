import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@/Components/Navbar2.css';
import DropdownServices from '@/Components/pages/services/Dropdown';
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import user from '@/assets/user.png';
import DropdownMember from './pages/member/Dropdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import UserPhoto from '@/assets/UserProfile.png';
import AdminPhoto from '@/assets/AdministratorProfile.png';
import DropdownAdminTools from './pages/admin/Dropdown';
import BuildIcon from '@mui/icons-material/Build';
import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "@/assets/Logo4.png";

const menunevbar = [
  { name: 'Home', path: '/', role: 'All', index: 0},
  { name: 'Services', path: '/services', role: 'All', icon: <ExpandMoreIcon/>, index: 1},
  { name: 'Member', path: '/members', role: 'All', icon: <ExpandMoreIcon/>, index: 2},
  { name: 'Contact Us', path: '/contact-us', role: 'User', index: 0},
  { name: 'Admin Tools', path: '/admin-tools', role: 'Admin', icon: <ExpandMoreIcon/>, index: 3},
];

function Navbar2() {
  const [click, setClick] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [dropdown3, setDropdown3] = useState(false);
  const [members, setMembers] = useState<MemberInterface>({});
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const roles = localStorage.getItem("role");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const toggleDropdown = () => {
    setOpen((prevIsOpen) => !prevIsOpen);
  };

  const onMouseEnterServices = () => {
    if (window.innerWidth < 960) {
      setDropdown1(false);
    } else {
      setDropdown1(true);
    }
  };

  const onMouseLeaveServices = () => {
    if (window.innerWidth < 960) {
      setDropdown1(false);
    } else {
      setDropdown1(false);
    }
  };

  const onMouseEnterMember = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(true);
    }
  };

  const onMouseLeaveMember = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(false);
    }
  };

  const onMouseEnterAdminTools = () => {
    if (window.innerWidth < 960) {
      setDropdown3(false);
    } else {
      setDropdown3(true);
    }
  };

  const onMouseLeaveAdminTools = () => {
    if (window.innerWidth < 960) {
      setDropdown3(false);
    } else {
      setDropdown3(false);
    }
  };

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

  useEffect(() => {
      GetMembers();
      const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener('mousedown', handleOutsideClick);
      } else {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, [open]);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className="flex items-center justify-between cursor-pointer ml-4 justify-self-start" 
          onClick={closeMobileMenu}>
            <img src={logo} alt='logo'/>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {menunevbar.map((item) => {
            if ((roles === item.role) || item.role === 'All') {
              if (item.index === 1) {
                return (
                  <li 
                    className='nav-item z-20'
                    onMouseEnter={onMouseEnterServices}
                    onMouseLeave={onMouseLeaveServices}>
                      <Link 
                        to={item.path} 
                        key={item.name}
                        className='nav-links' 
                        onClick={closeMobileMenu}
                        >
                          <h1>{item.name} {item.icon}</h1>
                      </Link>
                      {dropdown1 && <DropdownServices/>}
                  </li>
                )
              }
              if (item.index === 2) {
                return (
                  <li 
                      className='nav-item z-20'
                      onMouseEnter={onMouseEnterMember}
                      onMouseLeave={onMouseLeaveMember}>
                      <Link 
                        to={item.path} 
                        key={item.name}
                        className='nav-links' 
                        onClick={closeMobileMenu}
                      >
                        <h1>{item.name} {item.icon}</h1>
                      </Link>
                      {dropdown2 && <DropdownMember/>}
                  </li>
                )
              }
              if (item.index === 3) {
                return (
                  <li 
                      className='nav-item z-20'
                      onMouseEnter={onMouseEnterAdminTools}
                      onMouseLeave={onMouseLeaveAdminTools}>
                      <Link 
                        to={item.path} 
                        key={item.name}
                        className='nav-links bg-rose-50 rounded-xl' 
                        onClick={closeMobileMenu}
                      >
                        <h1><BuildIcon/>{item.name} {item.icon}</h1>
                      </Link>
                      {dropdown3 && <DropdownAdminTools/>}
                  </li>
                )
              }
              else {
                return (
                  <li className='nav-item z-20'>
                    <Link 
                      to={item.path} 
                      key={item.name}
                      className='nav-links' 
                      onClick={closeMobileMenu}
                    >
                      <h1>{item.name}</h1>
                    </Link>
                  </li>
                )
              }
            }
          })}
        </ul>
        {isAboveMediumScreens ? (
          <div className="md:flex my-3 relative rounded-full right-5">
                <img src={user} alt='user-logo' 
                    onClick={toggleDropdown}
                    className='h-10 w-10 hover:bg-yellow-200
                    rounded-full cursor-pointer active:scale-[.98] active:duration-75 transition-all'
                />
                { open && (
                  <div className='p-2 w-52 shadow-lg absolute right-0 top-14 rounded-md z-20 bg-slate-50'
                    ref={dropdownRef}
                  >
                    <ul>
                      {ImageOption()}
                      <p className='flex justify-center items-center text-center span-font-size text-purple-950 my-2 p-0 rounded-md bg-gray-200'>
                        {members.Firstname} {members.Lastname}
                      </p>
                      <li className='p-1 my-2 cursor-pointer rounded hover:bg-yellow-500'>
                        <Link to="/profile"
                          className='text-base'
                          onClick={()=> setOpen(false)}>
                            <AccountCircleIcon/> My Profile
                        </Link>
                      </li>
                      <li className='p-1 my-2 cursor-pointer rounded hover:bg-yellow-500'>
                        <Link to="/bookingsch"
                          className='text-base'
                          onClick={()=> setOpen(false)}>
                            <BookmarksIcon/> Booking Schedule
                        </Link>
                      </li>
                      <li className='p-1 my-2 cursor-pointer rounded hover:bg-yellow-500'>
                        <Link to="/contact-us"
                          className='text-base' 
                          onClick={()=> setOpen(false)}>
                            <HelpCenterIcon/> Helps
                        </Link>
                      </li>
                      <li 
                        onClick={signout}
                        className='p-1 text-base cursor-pointer rounded hover:bg-yellow-500' >
                          <LogoutIcon/> Sign Out
                      </li>
                    </ul>
                  </div>
                  )
                }
          </div>
        ) : (
          <button 
              className="rounded-full bg-yellow-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
          </button>
        )
        }

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
            <Link to="/">
              Home
            </Link>
            <Link to="/services">
              Services
            </Link>
            <Link to="/members'">
              Member
            </Link>
            {(roles === "User") ? (
              <Link to="/contact-us">
                Contact Us
              </Link>
            ):(
              <Link to="/admin-tools">
                Administrator Tools
              </Link>
            )}
          </div>
        </div>
      )}
      </nav>
    </>
  );

  function ImageOption() {
    if (roles === 'User') {
      return (
      <img className='flex justify-center items-center my-1' src={UserPhoto} alt='user-cover-photo'/>
      )
    }
    if (roles === 'Admin') {
      return(
      <img className='flex justify-center items-center my-1' src={AdminPhoto} alt='admin-cover-photo'/>
      )
    }
  }
}

export default Navbar2;