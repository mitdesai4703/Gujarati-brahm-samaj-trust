import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const ResetPassword = () => {
  const {backendUrl} =useContext(AppContent)
  axios.defaults.withCredentials = true
  const navigate= useNavigate();
  const [email, setEmail]=useState('')
  const [newPassword, setNewPassword]=useState('')
  const [isEmailSent, setIsEmailSent]=useState(false)
  const [otp, setOtp]=useState(0)
  const [isOtpSubmited, setIsOtpSubmited]=useState(false)

   const inputRefs = useRef([]);
  
    const handleInput = (e, index) => {
      const value = e.target.value;
      if (value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handlePaste = (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.trim().slice(0, 6).split('');
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    };

    const onSubmitEmail = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
    data.success ? toast.success(data.message) : toast.error(data.message);
    data.success && setIsEmailSent(true);
  } catch (error) {
    toast.error(error.message);
  }
};

const onSubmitOTP = async (e)=>{
  e.preventDefault();
  const otpArray = inputRefs.current.map(e=>e.value)
  setOtp(otpArray.join(''))
  setIsOtpSubmited(true)
}

const onSubmitNewPassword = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      backendUrl + '/api/auth/reset-password',
      { email, otp, newPassword }
    );
    data.success
      ? toast.success(data.message)
      : toast.error(data.message);
    data.success && navigate('/login');
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-yellow-200 to-red-300">

    {!isEmailSent &&
    <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
  <h1 className="text-white text-2xl font-semibold text-center mb-4">
    Reset password
  </h1>
  <p className="text-center mb-6 text-indigo-300">
    Enter your registered email address
  </p>
  <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
    <img src={images.mail_icon} alt="" className="w-3 h-3" />
    <input
      type="email"
      placeholder="Email id"
      className="bg-transparent outline-none text-white"
      value={email}
      onChange={e=>setEmail(e.target.value)}
      required
    />
  </div>
  <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer mt-2'>Submit</button>
</form>
    }

{!isOtpSubmited && isEmailSent &&
 <form onSubmit={onSubmitOTP}  className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              key={index}
              maxLength="1"
              required
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer">
          Submit
        </button>
      </form>
}

{isOtpSubmited && isEmailSent &&
       <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
  <h1 className="text-white text-2xl font-semibold text-center mb-4">
    New Password
  </h1>
  <p className="text-center mb-6 text-indigo-300">
    Enter the new password below
  </p>
  <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
    <img src={images.lock_icon} alt="" className="w-3 h-3" />
    <input
      type="password"
      placeholder="Password"
      className="bg-transparent outline-none text-white"
      value={newPassword}
      onChange={e=>setNewPassword(e.target.value)}
      required
    />
  </div>
  <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer mt-2'>Submit</button>
</form>
}

      
    </div>
  )
}

export default ResetPassword
