import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { MentorSignupAction } from "../../../services/redux/action/mentorSignup";
import { useDispatch } from "react-redux";

function Login() {
  //state's
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  //
  const queryParams = {
    email,
    password,
  };

  useEffect(() => {
    const token = localStorage.getItem("mentorToken");
    if (token) {
      navigate(mentorEndpoints.login);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await mentorAxios.get(mentorEndpoints.login, {
        params: queryParams,
      });
      if (response.data.mentorData && response.data.mentorData.email) {
        localStorage.setItem("mentorToken", response.data.token);
        localStorage.setItem("mentorEmail", response.data.mentorData.email);
        // redux store data
        const mentorPayload = response.data.mentorData;
        dispatch(MentorSignupAction(mentorPayload));
        showSuccessToast("Login Successfull");
        setTimeout(() => {
          navigate(mentorEndpoints.profile);
        }, 2300);
      } else {
        showErrorToast("Please check email & password");
      }
    } catch (error) {
      console.log("error", error);
      alert((error as Error).message);
    }
  };
  //
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#38241a]">Mentor Login</h2>
          <ToastContainer />
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              className="p-2 mt-8 rounded-xl border login"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
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
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </svg>
            </div>
            <button className="bg-[#593E31] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <p>Don't have an account?</p>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#ffffff]">
            <button
              className="py-2 px-5 border rounded-xl hover:scale-110 duration-300"
              style={{ backgroundColor: "#4C3869" }}
              onClick={() => {
                navigate(mentorEndpoints.signup);
              }}
            >
              Register
            </button>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://img.freepik.com/free-photo/view-3d-businessman-working-laptop_23-2150709808.jpg?t=st=1699953295~exp=1699956895~hmac=bc37f9bbeb249e63f3d26e6c7e4fef6eb8fd7e0c3bc537bcc12e4162fb02ef5c&w=740"
            alt="Login Image"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
