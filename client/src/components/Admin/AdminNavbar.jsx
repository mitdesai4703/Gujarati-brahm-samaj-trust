import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useAppContext();

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`);
      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
      <Link to='/'>
        <img src={images.logo} alt='logo' className='h-20 invert opacity-80' />
      </Link>
      <button
        onClick={handleLogout}
        className='bg-red-600 hover:bg-red-800 text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer'
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
