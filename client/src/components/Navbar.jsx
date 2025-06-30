import React, { useContext } from "react";
import HeaderBar from "./HeaderBar";
import { useNavigate } from "react-router-dom";
import { AppContent, useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);
  const { setShowHallReg } = useAppContext();

  // Start with default nav links
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "અમારા વિશે", path: "/aboutus" },
    { name: "સમુદાય હોલ", path: "/community-hall" },
    { name: "પુજારી સેવાઓ", path: "/priest-services" },
    { name: "મહિલા મહામંડળ", path: "/ladies-group" },
    { name: "રહેઠાણ", path: "/accommodation" },
    { name: "દાન", path: "/donate" },
    { name: "શિક્ષણ", path: "/education" },
    { name: "સમાચાર અને પ્રવૃત્તિઓ", path: "/news" },
    { name: "સંપર્ક", path: "/contactus" },
  ];

  // Add hotel registration if user is not admin
  if (userData && userData.role !== "admin") {
    navLinks.push({
      name: "હોલ રજિસ્ટ્રેશન",
      path: "#",
      onClick: () => setShowHallReg(true),
    });
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });

      setUserData(null);
      setIsLoggedin(false);
      navigate("/");
      toast.success("Logged out successfully!", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <HeaderBar />
      <nav className="bg-yellow-200 text-black pt-5 pb-5 px-4 w-full shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm md:text-base pl-25">
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="hover:underline transition duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div>
            {userData ? (
              <div className="w-10 h-10 flex justify-center items-center rounded-full bg-red-700 text-white relative group">
                {userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                  <ul className="list-none m-0 p-2 bg-yellow-100 text-sm">
                    {!userData.isAccountVerified && (
                      <li
                        onClick={sendVerificationOtp}
                        className="py-1 px-2 hover:bg-yellow-200 cursor-pointer"
                      >
                        Verify Email
                      </li>
                    )}
                    <li
                      onClick={() => navigate("/my-bookings")}
                      className="py-1 px-2 hover:bg-yellow-200 cursor-pointer pr-10 whitespace-nowrap"
                    >
                      My Bookings
                    </li>
                    <li
                      onClick={handleLogout}
                      className="py-1 px-2 hover:bg-yellow-200 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-red-600 hover:bg-red-800 text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
