import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'; 
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import CommunityHall from './pages/CommunityHall';
import Footer from './components/Footer';
import HallDetails from './pages/HallDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

const App = () => {
  const location = useLocation();
  const hiddenNavbarPaths = ['/login', '/email-verify', '/reset-password'];
  const hideNavbar = hiddenNavbarPaths.includes(location.pathname);

  return (
    <div>
      <Toaster position="top-center" /> 
      {!hideNavbar && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path='/community-hall' element={<CommunityHall/>}/>
          <Route path='/hall/:id' element={<HallDetails/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
           <Route path='/contactus' element={<ContactUs/>}/>
        </Routes>
      </div>
      {!hideNavbar && <Footer/>}
    </div>
  );
};

export default App;
