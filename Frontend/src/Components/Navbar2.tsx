import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@/Components/Navbar2.css';
import Logo from "@/assets/Logo4.png"
import DropdownServices from '@/Components/pages/services/Dropdown';
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import user from '@/assets/user.png';
import DropdownMember from './pages/member/Dropdown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar2() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState<MemberInterface>({});

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

useEffect(() => {
    GetMembers();
}, []);

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
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
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
            className='nav-item'
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
          
          <div className="gap-5 md:flex my-3">
            <button
              className="bg-yellow-500 rounded-3xl p-0.5 hover:bg-white"
            >
              <button 
                className="flex items-center active:scale-[.98] active:duration-75 
                  transition-all hover:scale-[1.01] ease-in-out"
                onClick={ShowProfileMore}
              >
                <div className="">
                  <img src={user} alt='user-logo' 
                    className='h-10 w-10 object-cover border-4 border-yellow-500 
                    rounded-full cursor-pointer'/>
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
        </ul>
      </nav>
    </>
  );
}

export default Navbar2;