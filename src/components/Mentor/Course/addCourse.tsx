import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { courseAddSchema } from "../../../utils/course";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import uploadFile from "../../../services/cloudinary/uploadCourseFile";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import { ToastContainer, } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';


const AddCourse: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File>();
  const [introVideo, setIntroVideo] = useState<File>();
  const [previewBanner, setPreviewBanner] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();
  const mentorStore = useSelector((state: RootState) => state.mentor);
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [videoLoading, setvideoLoading] = useState<boolean>(false);
  const mentorEmail = mentorStore.mentor.email
  const verificationStatus = mentorStore.mentor.verification
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    subtitle: "",
    duration: "",
    fee: "",
    createdby: mentorEmail,
    description: "",
    banner: "",
    introvideo: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (bannerImage && introVideo) {
        const banner = previewBanner;
        const introvideo = previewVideo;
  
        const Data = { ...values, banner, introvideo };
        const response = await mentorAxios.post(
          mentorEndpoints.addCoursePost,
          Data
        );
  
        if (response.status === 201) {
          showSuccessToast("Course Added"); 
          setTimeout(() => {
            navigate(mentorEndpoints.courses);
          }, 3000);

        } else {
          showErrorToast(response?.data?.message);
        }
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };
  

  return (
    <div className="bg-[#2233]  ">
      {verificationStatus === "Pending" || verificationStatus === "Reject" ? (<p className="text-center py-4 text-gray-500 bg-red-200 shadow-md rounded  overflow-x-auto">Account is not verified by the admin</p>):
       ( <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={courseAddSchema}
      >
        <Form className="max-w-sm mx-auto ">
          <h1 className="text-xl mb-5">Add Course</h1>
          <ToastContainer/>
          <div>
            <label htmlFor="title">Course Title:</label>
            <Field
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="subtitle">Course Subtitle </label>
            <Field
              type="text"
              id="email"
              name="subtitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="subtitle" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="duration">Course Duration </label>
            <Field
              type="text"
              id="duration"
              name="duration"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="duration" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="fee">Course Fee</label>
            <Field
              type="number"
              id="fee"
              name="fee"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="fee" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="createdby">Course Created By</label>
            <Field
              type="text"
              id="createdby"
              name="createdby"
              value= {mentorEmail} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="createdby" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="description">Course Description</label>
            <Field
              type="text"
              id="description"
              name="description"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error  mb-4"
            />
          </div>

          <div className="image-selection">
            <label htmlFor="banner" className="custom-file-upload">
              {bannerImage || previewBanner
                ? "\u00a0  \u00a0  Choose another banner image"
                : " \u00a0  \u00a0 Select a banner image"}
            </label>
            <Field
              type="file"
              name="banner"
              id="banner"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const imageFileList = e.target.files;
                if (imageFileList && imageFileList.length > 0) {
                  const image = imageFileList[0];
                  setBannerImage(image);
                  setBannerLoading(true)
                  uploadFile(image).then((url) =>{
                     setPreviewBanner(url);
                     setBannerLoading(false);
                  }

                     );
                  
                }
              }}
              className="file-input"
              style={{ display: "none" }}
            />
                 {bannerLoading && <div>Uploading...</div>}
            {previewBanner && (
              <img
                src={previewBanner}
                alt="Displayed Image"
                style={{ width: "30%", height: "20%" }}
              />
            )}
          </div>
          <ErrorMessage name="banner" component="div" className="error" />

          <div className="image-selection">
            <label htmlFor="introvideo" className="custom-file-upload">
              {introVideo || previewVideo
                ? "\u00a0  \u00a0  Choose another introduction video"
                : " \u00a0  \u00a0 Select an introduction video"}
            </label>
            <Field
              type="file"
              name="introvideo"
              id="introvideo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const imageFileList = e.target.files;
                if (imageFileList && imageFileList.length > 0) {
                  const video = imageFileList[0];
                  setIntroVideo(video);
                  setvideoLoading(true)
                  uploadFile(video).then((url) =>{ setPreviewVideo(url);
                    setvideoLoading(false)

                  });
                }
              }}
              className="file-input"
              style={{ display: "none" }}
            />
           {videoLoading &&<div> Uploading...</div>}
            {previewVideo && (
              <video autoPlay muted loop controls={false} width="400" height="200">
              <source src={previewVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            )}
            <ErrorMessage name="introvideo" component="div" className="error" />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-4 mb-4"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      </div>)}
    </div>
  );
};

export default AddCourse;
