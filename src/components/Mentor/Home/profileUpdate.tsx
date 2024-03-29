import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./profile.css";
import { RootState } from "../../../Interfaces/common";
import { useNavigate } from "react-router-dom";
import { MentorUpdateAction } from "../../../services/redux/action/mentorUpdate";
import { showErrorToast, showSuccessToast } from "../../../services/popups/popups";
import { ToastContainer } from "react-toastify";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";

function Profile() {
  
  const mentor = useSelector((state: RootState) => state.MentorUpdate);
  const APIURL = useSelector((state: RootState) => state.APIURL.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage1, setSelectedImage1] = useState<File>();
  const [previewImage1, setPreviewImage1] = useState<string>();
  const [selectedImage2, setSelectedImage2] = useState<File>();
  const [previewImage2, setPreviewImage2] = useState<string>();
  const [selectedImage3, setSelectedImage3] = useState<File>();
  const [previewImage3, setPreviewImage3] = useState<string>();
 
  useEffect(() => {
    const mentorEmail = localStorage.getItem("mentorEmail");

  mentorAxios
      .get(mentorEndpoints.profile, {
        params: { email: mentorEmail }
      })
      .then((response) => {
        dispatch(MentorUpdateAction("firstname", response.data.firstname));
        dispatch(MentorUpdateAction("lastname", response.data.lastname));
        dispatch(MentorUpdateAction("email", response.data.email));
        dispatch(MentorUpdateAction("mobile", response.data.mobile));
        dispatch(MentorUpdateAction("image", response.data.image));
        dispatch(MentorUpdateAction("aadhar_image", response.data.aadhar_image));
        dispatch(MentorUpdateAction("experience_image", response.data.experience_image));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [APIURL, dispatch]);

  const handleImageChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;

    if (imageFileList && imageFileList.length > 0) {
      const image = imageFileList[0];
      setSelectedImage1(image);
      setPreviewImage1(URL.createObjectURL(image));
    }
  };
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;

    if (imageFileList && imageFileList.length > 0) {
      const image = imageFileList[0];
      setSelectedImage2(image);
      setPreviewImage2(URL.createObjectURL(image));
    }
  };
  const handleImageChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;

    if (imageFileList && imageFileList.length > 0) {
      const image = imageFileList[0];

      setSelectedImage3(image);
      setPreviewImage3(URL.createObjectURL(image));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(MentorUpdateAction(e.target.name, e.target.value));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
    
      const formData = new FormData();
      if (selectedImage1)formData.append("images[]", selectedImage1);
      if(selectedImage2)formData.append("images[]", selectedImage2);
      if(selectedImage3) formData.append("images[]", selectedImage3);

      if (mentor) {
        formData.append("firstname", mentor.firstname);
        formData.append("lastname", mentor.lastname);
        formData.append("email", mentor.email);
        formData.append("mobile", mentor.mobile);
      }

      const oldEmail = localStorage.getItem("mentorEmail");
    
      const response = await mentorAxios.patch(
        mentorEndpoints.profileUpdate,
        formData,
        {
       
          params: { mentorEmail: oldEmail },
        }
      );
      if (response.status === 200) {
        showSuccessToast("Update Successfull");
        setTimeout(() => {
          navigate(mentorEndpoints.profile);
        }, 2300);
       
      } else {
        showErrorToast("Update failed");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
                  <strong>Update Mentor Details</strong>
                  <ToastContainer/>
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
                    value={mentor.firstname}
                    onChange={onChange}
                   
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                 
                  </label>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="lastname"
                    placeholder="Enter your last name"
                    required
                    value={mentor.lastname}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                   
                  </label>
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
                    value={mentor.email}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                   
                  </label>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    name="mobile"
                    placeholder="Enter your number"
                    required
                    value={mentor.mobile}
                    onChange={onChange}
                  />
                  <label
                    htmlFor="exampleFormControlInput22"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                  
                  </label>
                </div>
              </div>

              <div className="image-selection">
                <label htmlFor="fileInput" className="custom-file-upload">
                  {mentor.image || previewImage1
                    ? "\u00a0  \u00a0  Choose another profile photo"
                    : "Select a profile Photo"}
                </label>
                <input
                  className="file-input"
                  type="file"
                  name="images[]"
                  id="fileInput"
                  onChange={handleImageChange1}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {previewImage1 ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={previewImage1}
                    alt="profile-image"
                    className="profile-image"
                  />
                ) : mentor && mentor.image ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={`${APIURL}/public/images/${mentor.image}`}
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

              {/* aadhar image */}

              <div className="image-selection">
                <label htmlFor="fileInput2" className="custom-file-upload">
                  {mentor?.aadhar_image || previewImage2
                    ? "\u00a0  \u00a0  Choose another aadhar photo"
                    : "Select a aadhar Photo"}
                </label>
                <input
                  className="file-input"
                  type="file"
                  name="images[]"
                  id="fileInput2"
                  onChange={handleImageChange2}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {previewImage2 ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={previewImage2}
                    alt="aadhar-image"
                    className="profile-image"
                  />
                ) : mentor && mentor.aadhar_image ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={`${APIURL}/public/images/${mentor.aadhar_image}`}
                    alt="aadhar-image"
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
                    alt="aadhar-image"
                    className="profile-image"
                  />
                )}
              </div>

              {/* experience image doc */}

              <div className="image-selection">
                <label htmlFor="fileInput3" className="custom-file-upload">
                  {mentor?.experience_image || previewImage3
                    ? "\u00a0  \u00a0  Choose another experience photo"
                    : "Select a experience_image"}
                </label>
                <input
                  className="file-input"
                  type="file"
                  name="images[]"
                  id="fileInput3"
                  onChange={handleImageChange3}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {previewImage3 ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={previewImage3}
                    alt="experience_image"
                    className="profile-image"
                  />
                ) : mentor && mentor.experience_image ? (
                  <img
                    style={{
                      width: "auto",
                      height: "50px",
                      margin: "5px 0 15px 0",
                    }}
                    src={`${APIURL}/public/images/${mentor.experience_image}`}
                    alt="experience_image"
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
                    alt="experience_image"
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
