import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@/Components/Navbar2.css';
import Logo from "@/assets/Logo4.png"
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
import UserPhoto from '@/assets/Administrator.png';

function Navbar2() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [members, setMembers] = useState<MemberInterface>({});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnterServices = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeaveServices = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const toggleDropdown = () => {
    setOpen((prevIsOpen) => !prevIsOpen);
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
          <img alt="logo" src= {Logo} />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' 
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li
            className='nav-item z-20'
            onMouseEnter={onMouseEnterServices}
            onMouseLeave={onMouseLeaveServices}
          >
            <Link
              to='/services'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Services<ExpandMoreIcon/>
            </Link>
            {dropdown && <DropdownServices />}
          </li>
          <li 
            className='nav-item z-20'
            onMouseEnter={onMouseEnterMember}
            onMouseLeave={onMouseLeaveMember}
          >
            <Link
              to='/members'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Member<ExpandMoreIcon/>
            </Link>
            {dropdown2 && <DropdownMember />}
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>
          <div className="gap-5 md:flex my-3 relative rounded-full right-5">
                <img src={user} alt='user-logo' 
                    onClick={toggleDropdown}
                    className='h-10 w-10 hover:bg-yellow-200
                    rounded-full cursor-pointer active:scale-[.98] active:duration-75 transition-all'
                />
                { open && (
                  <div className='bg-white p-2 w-52 shadow-lg absolute right-0 top-14 rounded-md z-20'
                    ref={dropdownRef}
                  >
                    <ul>
                      <img className='flex justify-center items-center my-1' src={UserPhoto} alt='user-cover-photo'/>
                      <p className='flex justify-center items-center span-font-size text-purple-950 my-2 p-0 rounded-md bg-gray-200'>
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
      </nav>
    </>
  );
}

export default Navbar2;