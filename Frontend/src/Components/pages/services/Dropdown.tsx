import { useState } from 'react';
import '@/Components/Dropdown.css';
import { Link } from 'react-router-dom';

const MenuItemServices = [
  {
    title: 'Equipments',
    path: '/equipments',
    cName: 'dropdown-link',
    role: 'all'
  },
  {
    title: 'Recreation Room',
    path: '/recreations',
    cName: 'dropdown-link',
    role: 'all'
  },
  {
    title: 'Workout Programs',
    path: '/programs',
    cName: 'dropdown-link',
    role: 'all'
  },
  {
    title: 'Booking',
    path: '/bookings',
    cName: 'dropdown-link',
    role: 'all'
  }
];

function DropdownServices() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItemServices.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
                role={item.role}
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

export default DropdownServices;