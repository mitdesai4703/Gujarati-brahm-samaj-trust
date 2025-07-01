import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import CommunityHall from "./pages/CommunityHall";
import Footer from "./components/Footer";
import HallDetails from "./pages/HallDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyBookings from "./pages/MyBookings";
import HotelRegistration from "./components/Admin/HotelRegistration";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddHall from "./pages/Admin/Hall/AddHall";
import ListHall from "./pages/Admin/Hall/ListHall";
import { useAppContext } from "./context/AppContext";
import CampaignForm from "./components/Donation/CampaignForm";
import CampaignPage from "./pages/CampaignPage";
import PriestService from "./pages/PriestService";
import CampaignPageUser from "./pages/CampaignPageUser";
import CampaignInfo from "./pages/CampaignInfo";
import DonationPage from "./pages/DonationPage";

const App = () => {
  const location = useLocation();
  const hiddenNavbarPaths = [
    "/login",
    "/email-verify",
    "/reset-password",
    "/admin",
  ];
  const hideNavbar =
    hiddenNavbarPaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  const { showHallReg } = useAppContext();

  return (
    <div>
      <Toaster position="top-center" />
      {!hideNavbar && <Navbar />}
      {showHallReg && <HotelRegistration />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/community-hall" element={<CommunityHall />} />
          <Route path="/hall/:id" element={<HallDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/priest-services" element={<PriestService />} />
          <Route path="/campaignpage" element={<CampaignPageUser />} />
          <Route path="/campaign/:id" element={<CampaignInfo />} />
           <Route path='/donations' element={<DonationPage/>}/>

          {/* Admin */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-hall" element={<AddHall />} />
            <Route path="list-hall" element={<ListHall />} />
            <Route path="campaigns" element={<CampaignPage />} />
            <Route path="campaigns/create" element={<CampaignForm />} />
            <Route path="campaigns/edit/:id" element={<CampaignForm />} />
          </Route>
        </Routes>
      </div>
      {!hideNavbar && <Footer />}
    </div>
  );
};

export default App;
