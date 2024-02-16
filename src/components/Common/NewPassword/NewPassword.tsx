import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { userAxios } from '../../../Constraints/axiosInterceptors/userAxiosInterceptors';
import userEndpoints from '../../../Constraints/endpoints/userEndpoints';
import { showErrorToast, showSuccessToast } from '../../../services/popups/popups';
import { ToastContainer } from 'react-toastify';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {state} = useLocation()
  const email = state.email
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    // Add your password reset logic here
    console.log('Password reset logic goes here',newPassword,email);
    try {
      const response = await userAxios.post(userEndpoints.newPasswordPost,{newPassword,email});
      if (response.status === 201) {
        showSuccessToast("Password Updated ");
        setTimeout(() => {
          navigate(userEndpoints.login);
        }, 2300);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 8 && password.trim() !== '';
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-gray-200 p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <ToastContainer/>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              className="w-full p-2 border rounded-md border-black-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <svg
              onClick={handleShowPassword}
              xmlns="https://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
            Confirm New Password 
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="w-full p-2 border rounded-md border-black-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
            <svg
              onClick={handleShowPassword}
              xmlns="https://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </svg>
          </div>
        </div>
        <button
          className={`w-full bg-[#002D74]  text-white p-2 rounded-md ${
            isPasswordValid(newPassword) && confirmPassword === newPassword ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={handleResetPassword}
          disabled={!isPasswordValid(newPassword) || confirmPassword !== newPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
