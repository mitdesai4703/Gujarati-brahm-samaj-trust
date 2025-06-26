import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;



  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); 

 
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

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    fetchUserData,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
