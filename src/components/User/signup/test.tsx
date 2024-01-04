import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./signup.css";
import { RootState } from "../../../Interfaces/common";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SignupSchema } from "../../../utils/validationSchema";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";
import uploadImage from "../../../services/cloudinary/customeImageUpload";

function Signup() {
  const [image, setImage] = useState<File>();
  const [viewImage, setViewImage] = useState<string>();
  const signup = useSelector((state: RootState) => state.UserSignup);
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    image: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const image = viewImage;
      const Data = { ...values, image };

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
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Login Image"
          />
        </div>
        <div className="md:w-2/2 px-8 md:px-16 ">
          <h2 className="font-bold text-2xl text-[#002D74]">User Signup</h2>
          <ToastContainer />

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
          >
            <Form>
              <div className="flex justify-between">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="lastname"
                    placeholder="Enter your last name"
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.firstname && <>First Name</>}
                  </label>
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="lastname"
                    placeholder="Enter your last name"
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.lastname && <>Last Name</>}
                  </label>
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.email && <>Email address</>}
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="mobile"
                    placeholder="Enter your number"
                  />
                  <label
                    htmlFor="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.mobile && <>Phone Number</>}
                  </label>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="password"
                    placeholder="Create a password"
                  />
                  <label
                    htmlFor="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.password && <>Password</>}
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Field
                    type="password"
                    className="peer block min-h-[auto]  w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="confirm_password"
                    placeholder="Confirm password"
                  />
                  <label
                    htmlFor="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    {!signup.password && <>Confirm Password</>}
                  </label>
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                {/* <label htmlFor="fileInput" className="custom-file-upload">
                    {image
                      ? "Choose another photo"
                      : "\u00a0  Select a profile Photo"}
                  </label> */}
                <p>Profile picture</p>
                <Field
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const imageFileList = e.target.files;
                    if (imageFileList && imageFileList.length > 0) {
                      const image = imageFileList[0];
                      const foldername = "User Image";
                      setImage(image);
                      uploadImage(image, foldername).then((url) =>
                        setViewImage(url)
                      );
                    }
                  }}
                  className=" file-inputpeer block min-h-[auto] w-full rounded border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"

                  // style={{ display: "none" }}
                />
                <div>
                  {image && (
                    <img
                      style={{
                        width: "auto",
                        height: "100px",
                        margin: "5px 0 15px 0",
                      }}
                      src={viewImage}
                      alt="Mentor Profile"
                      className="profile-image"
                    />
                  )}
                </div>
                <ErrorMessage name="image" component="div" className="error" />
              </div>

              <div className="mb-6 flex items-center justify-between"></div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#3b71ca] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:bg-primary-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "#002D74", marginBottom: "1rem" }}
                >
                  submit
                </button>

                <br />
              </div>

              {/* ... (rest of the form code) */}
            </Form>
          </Formik>

          <Link to={userEndpoints.login}>Already registered?</Link>
        </div>
      </div>
    </section>
  );
}

export default Signup;
