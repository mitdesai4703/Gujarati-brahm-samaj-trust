import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaListUl } from 'react-icons/fa';

const Sidebar = () => {
  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { name: 'Add Hall', path: '/admin/add-hall', icon: <FaPlusCircle /> },
    { name: 'List Hall', path: '/admin/list-hall', icon: <FaListUl /> },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3 ${
              isActive
                ? 'border-r-4 border-red-700 text-red-600 bg-blue-600/10'
                : 'hover:bg-red-100/90 border-white text-gray-700'
            }`
          }
        >
          <div className="text-xl min-h-6 min-w-6">{item.icon}</div>
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
