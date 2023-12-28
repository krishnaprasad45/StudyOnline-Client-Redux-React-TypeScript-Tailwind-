import "./profileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Interfaces/common";
import { UserUpdateAction } from "../../../services/redux/action/userUpdate";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { userAxios } from "../../../Constraints/axiosInterceptors/userAxiosInterceptors";
import userEndpoints from "../../../Constraints/endpoints/userEndpoints";

function Profile() {
  const user = useSelector((state: RootState) => state.UserUpdate);
  const APIURL = useSelector((state: RootState) => state.APIURL.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    userAxios
      .get(userEndpoints.profile, {
        params: { email: userEmail },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then((response) => {
        dispatch(UserUpdateAction("firstname", response.data.firstname));
        dispatch(UserUpdateAction("lastname", response.data.lastname));
        dispatch(UserUpdateAction("email", response.data.email));
        dispatch(UserUpdateAction("mobile", response.data.mobile));
        dispatch(UserUpdateAction("image", response.data.image));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [APIURL, dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;

    if (imageFileList && imageFileList.length > 0) {
      const image = imageFileList[0];
      setSelectedImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(UserUpdateAction(e.target.name, e.target.value));
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (user) {
        formData.append("firstname", user.firstname);
        formData.append("lastname", user.lastname);
        formData.append("email", user.email);
        formData.append("mobile", user.mobile);
      }

      const oldEmail = localStorage.getItem("userEmail");
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await userAxios.post(userEndpoints.profileUpdate, formData, {
        headers,
        params: { userEmail: oldEmail },
      });
      if (response.status === 200) {
        showSuccessToast("Update Successfull");
        setTimeout(() => {
          navigate(userEndpoints.profile);
        }, 2300);
      } else {
        showErrorToast("Update failed");
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Login Form Illustration"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">
                  <strong>Update User</strong>
                  <ToastContainer />
                </p>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white"></p>
              </div>

              <div className="flex justify-between">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="firstname"
                    placeholder="Enter your first name"
                    required
                    value={user.firstname}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  ></label>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="lastname"
                    placeholder="Enter your last name"
                    required
                    value={user.lastname}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  ></label>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={user.email}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  ></label>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="mobile"
                    placeholder="Enter your number"
                    required
                    value={user.mobile}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  ></label>
                </div>
              </div>

              <div className="image-selection">
                <label htmlFor="fileInput" className="custom-file-upload">
                  {user.image || previewImage
                    ? "\u00a0  \u00a0  Choose another profile photo"
                    : "Select a profile Photo"}
                </label>
                <input
                  className="file-input"
                  type="file"
                  name="images[]"
                  id="fileInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {user.image ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={user.image}
                    alt="profile-image"
                    className="profile-image"
                  />
                ) : user && user.image ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={`${APIURL}/public/images/${user.image}`}
                    alt="profile-image"
                    className="profile-image"
                  />
                ) : (
                  <img
                    style={{
                      width: "auto",
                      height: "100px",
                      margin: "5px 0 15px 0",
                    }}
                    src=""
                    alt="profile-image"
                    className="profile-image"
                  />
                )}
              </div>
              <div className="text-center lg:text-left">
                <button
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#3b71ca] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:bg-primary-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "#002D74", marginBottom: "1rem" }}
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
