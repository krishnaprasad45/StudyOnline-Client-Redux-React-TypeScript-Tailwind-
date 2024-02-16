import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./otpstyle.css";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";

const OTPPage: React.FC = () => {
  const { state } = useLocation();
  const { email, Data,otp } = state;
  
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyUp = (
      e: KeyboardEvent,
      index1: number,
      currentInputValue: string
    ) => {
      const currentInput = e.target as HTMLInputElement,
        nextInput = currentInput.nextElementSibling as HTMLInputElement | null,
        prevInput =
          currentInput.previousElementSibling as HTMLInputElement | null;

      if (currentInputValue.length > 1) {
        currentInput.value = "";
        return;
      }
      if (
        nextInput &&
        nextInput.hasAttribute("disabled") &&
        currentInputValue !== ""
      ) {
        nextInput.removeAttribute("disabled");
        nextInput.focus();
      }
      if (e.key === "Backspace") {
        inputs.forEach((input, index2) => {
          if (index1 <= index2 && prevInput) {
            input.setAttribute("disabled", "true");
            input.value = "";
            prevInput.focus();
          }
        });
      }
      if (!inputs[3].disabled && inputs[3].value !== "") {
        button?.classList.add("active");
      } else {
        button?.classList.remove("active");
      }

      // Update the state with the entered OTP digit
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index1] = currentInputValue;
      setOtpDigits(newOtpDigits);
    };

    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    const button = document.querySelector<HTMLButtonElement>("button");

    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = e.target as HTMLInputElement;
        handleKeyUp(e, index1, currentInput.value);
      });
    });
   

    
    const response = userAxios.post(userEndpoints.sendEmail, { otp, email });

    window.addEventListener("load", () => inputs[0].focus());

    return () => {
      inputs.forEach((input, index1) => {
        input.removeEventListener("keyup", (e) => handleKeyUp(e, index1, ""));
      });
    };
  }, [otpDigits]);

  // const otp: string | undefined = generateOtp();
  // console.log("otp variable",otp)
  // setgeneratedOtp(otp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");

    console.log("gENERATED OTP:", otp);
    console.log("Entered OTP:", enteredOtp);
    if (otp == enteredOtp) {
      try {
        const response = await userAxios.post(userEndpoints.signup, Data);
        if (response.status === 201) {
          showSuccessToast("Account Created");
          setTimeout(() => {
            navigate(userEndpoints.login);
          }, 2300);
        } else {
          showErrorToast(response?.data?.message);
        }
      } catch (error) {
        showErrorToast((error as Error).message);
      }
    }
  };
  return (
    <div className="otp-container otp-body">
      <h1 className="font-semibold ">We sent OTP to your email </h1>
      <ToastContainer />
      <i> {email}</i>

      <h4>Enter OTP Code</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field ">
          <input type="number" />
          <input type="number" disabled />
          <input type="number" disabled />
          <input type="number" disabled />
        </div>
        <button className="verify-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPPage;

// function OTPPage() {
//   const { state } = useLocation();
//   const email = state.email;
//   const response = state.Data;
//   console.log(response)
//   return (
//     <>
//       <div>OTPPage</div>
//       <div>{email}</div>
//       <div>{response}</div>
//     </>
//   );
// }

// export default OTPPage;
