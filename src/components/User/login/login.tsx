import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import toast from "react-hot-toast";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { auth } from "../../../services/firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { UserSignupAction } from "../../../services/redux/action/userSignup";
import { RootState } from "../../../Interfaces/common";

function Login() {
  //state's
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state: RootState) => state.UserSignup);
  //
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const queryParams = {
    email,
    password,
  };

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
 

    if (token) {
      navigate(userEndpoints.dashboard);
    }
  },[]);

  //handle's
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await userAxios.get(userEndpoints.login, {
        params: queryParams,
      });
      if (response.data.userData && response.data.userData.email) {
        localStorage.setItem("usertoken", response.data.token);
        localStorage.setItem("userEmail", response.data.userData.email);

        // redux store data
         console.log(response.data.userData)
         const userPayload = response.data.userData
         dispatch(UserSignupAction(userPayload))
         console.log("user......##",user)
         



        showSuccessToast("Login Successfull");
        setTimeout(() => {
          navigate(userEndpoints.dashboard);
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

  //google_signin

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const signIpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;

      if (displayName && email) {
        submitSignInWithGoogle(displayName, email);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const submitSignInWithGoogle = async (displayName: string, email: string) => {
    try {
      const value = { displayName, email };
      const response = await userAxios.post(userEndpoints.gsignin, value);
      localStorage.setItem("usertoken", response.data.token);
  

      if (response) {
        showSuccessToast("Login Successfull");
        setTimeout(() => {
          navigate(userEndpoints.dashboard);
        }, 2300);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  };
console.log("user......**",user._id)

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Learner Login</h2>
          <ToastContainer />
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>
         
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
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
                onClick={handleShowPassword}
                xmlns="http://www.w3.org/2000/svg"
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
            <button
              onClick={signIpWithGoogle}
              className="bg-[#1c57b4] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login with Google
            </button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <p>Don't have an account?</p>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#000000]">
            <button
              className="py-2 px-5 border rounded-xl hover:scale-110 duration-300"
              style={{ backgroundColor: "skyblue" }}
              onClick={() => {
                navigate(userEndpoints.signup);
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
            src="https://img.freepik.com/free-photo/3d-rendering-cartoon-like-man-working-computer_23-2150797574.jpg?t=st=1699953470~exp=1699957070~hmac=706984dfee88657878b759a0dfca27115910e76a15e26dde5fe84b3239380e0d&w=740"
            alt="Login Image"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
