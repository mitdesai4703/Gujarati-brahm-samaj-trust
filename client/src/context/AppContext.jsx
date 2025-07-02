
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const AppContent = createContext();


export const useAppContext = () => useContext(AppContent);

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchedCities, setSearchedCities] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [showHallReg, setShowHallReg] = useState(false);

  
  const user = userData;
  const getToken = async () => "";

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setIsOwner(data.role === "admin");
        setSearchedCities(data.recentSearchedCities || []);
      } else {
        setTimeout(fetchUser, 5000); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      fetchUserData();
    }
  }, [isLoggedin]);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    fetchUserData,
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHallReg,
    setShowHallReg,
    searchedCities,
    setSearchedCities,
  };

  return (
    <AppContent.Provider value={value}>
      {children}
    </AppContent.Provider>
  );
};
