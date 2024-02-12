import "./adminLogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {showErrorToast,showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { adminAxios } from "../../../Constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../Constraints/endpoints/adminEndpoints";

function Login() {

  //state's
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

//handle's
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      const response = await adminAxios.post(adminEndpoints.login, {
        email,
        password,
      });
      if (response.data && response.data.adminData) {
        localStorage.setItem("token", response.data.adminToken);
        
        showSuccessToast("Login Successfull");
        setTimeout(() => {
          navigate(adminEndpoints.dashboard);
        }, 2300);
      } else {
       showErrorToast("error")
      }
    } catch (error) {
      console.log(error);
    }
  };
//
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Admin Login</h2>
          <ToastContainer />
          <p className="text-xs mt-4 text-[#002D74]"></p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className="input p-2 mt-8 rounded-xl border login"
              placeholder="Enter your email"
              name="email"
              onChange={handleEmailChange}
              value={email}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 rounded-xl border w-full login"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <svg
                onClick={toggleShowPassword}
                xmlns="https://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </svg>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>
        </div>
        
        {/* Image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://img.freepik.com/free-photo/facial-recognition-collage-concept_23-2150038887.jpg?size=626&ext=jpg&ga=GA1.1.386986016.1700222621&semt=ais"
            alt="Login Image"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;

