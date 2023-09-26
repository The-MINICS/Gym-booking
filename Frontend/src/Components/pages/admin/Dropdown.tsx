import { useState } from 'react';
import '@/Components/Dropdown.css';
import { Link } from 'react-router-dom';

const MenuItemAdmin = [
  {
    title: 'Member Management',
    path: '/member-manage',
    cName: 'dropdown-link',
  },
  {
    title: 'Equipment Management',
    path: '/equipment-manage',
    cName: 'dropdown-link',
  },
  {
    title: 'Room Management',
    path: '/room-mannage',
    cName: 'dropdown-link',
  },
  {
    title: 'Complaint Handling',
    path: '/complaint-handle',
    cName: 'dropdown-link',
  }
];

function DropdownAdminTools() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItemAdmin.map((item, index) => {
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

export default DropdownAdminTools;