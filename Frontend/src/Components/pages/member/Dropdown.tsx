import { useState } from 'react';
import '@/Components/Dropdown.css';
import { Link } from 'react-router-dom';

const MenuItemMember = [
  {
    title: 'Booking Schedule',
    path: '/bookingsch',
    cName: 'dropdown-link'
  },
  {
    title: 'Workout Programs',
    path: '/programs',
    cName: 'dropdown-link'
  },
  {
    title: 'Account Settings',
    path: '/account-setting',
    cName: 'dropdown-link'
  }
];

function DropdownMember() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItemMember.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DropdownMember;