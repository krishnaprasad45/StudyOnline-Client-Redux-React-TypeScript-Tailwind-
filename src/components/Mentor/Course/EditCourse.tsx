import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import {  useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { useLocation, useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import uploadFile from "../../../services/cloudinary/uploadCourseFile";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { RootState } from "../../../Interfaces/common";
import { useSelector } from "react-redux";
import { CourseInterface } from "../../../Interfaces/courseInterface";
import { courseUpdateSchema } from "../../../utils/courseUpdate";

const EditCourse: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<File>();
  const [introVideo, setIntroVideo] = useState<File>();
  const [previewBanner, setPreviewBanner] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();
  const mentorStore = useSelector((state: RootState) => state.mentor);
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [videoLoading, setvideoLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseInterface>();
  const mentorEmail = mentorStore.mentor.email;
  const verificationStatus = mentorStore.mentor.verification;
  const navigate = useNavigate();
  const { state } = useLocation();
  const courseId = state.courseId;
  const title = course?.title
  const subtitle = course?.subtitle
  const duration = course?.duration
  const fee = course?.fee
  const createdby = course?.createdby
  const description = course?.description
  const banner = course?.banner
  const introvideo = course?.introvideo

 
  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getCourse}?courseId=${courseId}`)
      .then((response) => {
        setCourse(response.data as CourseInterface);
        
      })
      .catch((error) => alert(error));
  }, [courseId]);

  useEffect(() => {
    if (course) {
      formik.setFieldValue('title', title);
      formik.setFieldValue('subtitle', subtitle);
      formik.setFieldValue('duration', duration);
      formik.setFieldValue('fee', fee);
      formik.setFieldValue('createdby', createdby);
      formik.setFieldValue('description', description);
      formik.setFieldValue('banner', banner);
      formik.setFieldValue('introvideo', introvideo);
    }
  }, [course]);

  const initialValues = {
    title: title,
    subtitle: course?.subtitle,
    duration: course?.duration || "",
    fee: course?.fee || "",
    createdby: mentorEmail || "",
    description: course?.description || "",
    banner: course?.banner || "",
    introvideo: course?.introvideo || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (bannerImage && introVideo) {
        // Upload files and get URLs
        const banner = await uploadFile(bannerImage);
        const introvideo = await uploadFile(introVideo);
  
        // Update course data with new URLs
        const updatedCourse = { ...values, banner, introvideo };
  
        // Perform the update API call
        const response = await mentorAxios.post(
          mentorEndpoints.addCoursePost,
          updatedCourse
        );
  
        if (response.status === 200) {
          showSuccessToast("Course Updated");
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

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: courseUpdateSchema,
  });

  return (
    <div className="bg-[#2233]  ">
      {verificationStatus === "Pending" || verificationStatus === "Reject" ? (
        <p className="text-center py-4 text-gray-500 bg-red-200 shadow-md rounded  overflow-x-auto">
          Account is not verified by the admin
        </p>
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={courseUpdateSchema}
          >
            <Form className="max-w-sm mx-auto ">
              <h1 className="text-xl mb-5">Edit Course</h1>
              <div>
                <label htmlFor="title">Course Title:</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
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
                  value={formik.values.subtitle}
                  onChange={formik.handleChange}

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="subtitle"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="duration">Course Duration </label>
                <Field
                 type="text"
                 id="duration"
                 name="duration"
                 value={formik.values.duration}
                 onChange={formik.handleChange}
                 
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="fee">Course Fee</label>
                <Field
                  type="number"
                  id="fee"
                  value={formik.values.fee}
                  onChange={formik.handleChange}

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
                  value={formik.values.createdby}
                  onChange={formik.handleChange}
                  
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage
                  name="createdby"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="description">Course Description</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}

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
                      setBannerLoading(true);
                      uploadFile(image).then((url) => {
                        setPreviewBanner(url);
                        setBannerLoading(false);
                      });
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
                      setvideoLoading(true);
                      uploadFile(video).then((url) => {
                        setPreviewVideo(url);
                        setvideoLoading(false);
                      });
                    }
                  }}
                  className="file-input"
                  style={{ display: "none" }}
                />
                {videoLoading && <div> Uploading...</div>}
                {previewVideo && (
                  <video
                    autoPlay
                    muted
                    loop
                    controls={false}
                    width="400"
                    height="200"
                  >
                    <source src={previewVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <ErrorMessage
                  name="introvideo"
                  component="div"
                  className="error"
                />
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
        </div>
      )}
    </div>
  );
};

export default EditCourse;
