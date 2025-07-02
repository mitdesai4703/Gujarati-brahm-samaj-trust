import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";

import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyBookings from "./pages/UserHall/MyBookings";
import HotelRegistration from "./components/Admin/HotelRegistration";
import Layout from "./pages/Admin/Layout";
import AddHall from "./pages/Admin/Hall/AddHall";
import { useAppContext } from "./context/AppContext";
import CampaignForm from "./components/Donation/CampaignForm";
import CampaignPage from "./pages/Donation/CampaignPage";
import PriestService from "./pages/PriestService";
import CampaignPageUser from "./pages/Donation/CampaignPageUser";
import CampaignInfo from "./pages/Donation/CampaignInfo";
import DonationPage from "./pages/Donation/DonationPage";
import AdminDonations from "./pages/Admin/AdminDonationPage";
import LadiesGroupPage from "./pages/LadiesGroupPage";
import LadiesEventAdmin from "./pages/Admin/LadiesEventAdmin";
import NewsPage from "./pages/Newspage";
import AdminNewsPage from "./pages/Admin/AdminNews";
import HallForm from "./components/Hall/HallForm";
import HallPageUser from "./pages/UserHall/HallPageUser";
import HallInfo from "./pages/UserHall/HallInfo";
import AdminBookings from "./pages/Admin/Hall/AdminBooking";

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
          <Route path="/halls" element={<HallPageUser />} />

          <Route path="/hall/:id" element={<HallInfo />} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/priest-services" element={<PriestService />} />
          <Route path="/campaignpage" element={<CampaignPageUser />} />
          <Route path="/campaign/:id" element={<CampaignInfo />} />
          <Route path="/donations" element={<DonationPage />} />
          <Route path="/ladies-group" element={<LadiesGroupPage />} />
          <Route path="/news" element={<NewsPage />} />

          {/* Admin */}
          <Route path="/admin" element={<Layout />}>
        
            <Route path="add-hall" element={<AddHall />} />
            <Route path="campaigns" element={<CampaignPage />} />
            <Route path="campaigns/create" element={<CampaignForm />} />
            <Route path="campaigns/edit/:id" element={<CampaignForm />} />
            <Route path="admin-donations" element={<AdminDonations />} />
            <Route path="ladies-event" element={<LadiesEventAdmin />} />
            <Route path="adminnews" element={<AdminNewsPage />} />
            <Route path="halls/create" element={<HallForm />} />
            <Route path="halls/edit/:id" element={<HallForm />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          {/* Always last */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
      {!hideNavbar && <Footer />}
    </div>
  );
};

export default App;
