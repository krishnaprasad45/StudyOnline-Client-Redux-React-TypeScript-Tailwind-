import React, { useState } from "react";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { showErrorToast, showSuccessToast } from "../../../services/popups/popups";
import { useNavigate } from "react-router-dom";
import isEmailValid from "../../../utils/isEmailValid";
import { ToastContainer } from "react-toastify";

const EnterEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  

  const handleContinueClick = async () => {
    if (!isEmailValid(email)) {
      showErrorToast("Please enter a valid email address");
      return;
    }

    try {
      const response = await userAxios.post(
        userEndpoints.enterEmailPost,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const generatedOtp = response.data.otp
        showSuccessToast("OTP Sent To your email to reset your password");
        setTimeout(() => {
          navigate(userEndpoints.getOtpForReset, { state: { email,generatedOtp } });
        }, 2500);
      } else if (response.status === 409) {
        showErrorToast("Email does not exist, register first");
        setTimeout(() => {
          navigate(userEndpoints.signup);
        }, 2500);
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Reset your password</h2>
        <ToastContainer/>
        <input
          type="email"
          placeholder="Your registered email id"
          className="border border-gray-300 p-3 mb-4 w-full rounded-md"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="bg-[#002D74] text-white px-6 py-3  rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EnterEmail;
