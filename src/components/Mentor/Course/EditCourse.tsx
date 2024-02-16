import { useEffect, useState } from "react";
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
import { ToastContainer } from 'react-toastify';

const EditCourse: React.FC = () => {
  const mentorStore = useSelector((state: RootState) => state.mentor);
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [videoLoading, setvideoLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseInterface>();
  // const mentorEmail = mentorStore.mentor.email;
  const verificationStatus = mentorStore.mentor.verification;
  const navigate = useNavigate();
  const { state } = useLocation();
  const courseId = state.courseId;
  
  const [title, setTitle] = useState<string | undefined>(course?.title);
  const [subtitle, setSubtitle] = useState<string | undefined>(course?.subtitle);
  const [duration, setDuration] = useState<string | undefined>(course?.duration);
  const [fee, setFee] = useState<string | undefined>(course?.subtitle);
  const [createdby, setCreatedBy] = useState<string | undefined>(course?.createdby);
  const [description, setDescription] = useState<string | undefined>(course?.description);
  const [bannerImage, setBannerImage] = useState<File>();
  const [introVideo, setIntroVideo] = useState<File>();
  const [previewBanner, setPreviewBanner] = useState<string | undefined>(course?.banner);
  const [previewVideo, setPreviewVideo] = useState<string | undefined>(course?.introvideo);

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getCourse}?courseId=${courseId}`)
      .then((response) => {
        setCourse(response.data as CourseInterface);
        setTitle(response.data.title);
        setSubtitle(response.data.subtitle);
        setDuration(response.data.duration);
        setFee(response.data.fee);
        setCreatedBy(response.data.createdby);
        setDescription(response.data.description);
      })
      .catch((error) => alert(error));
  }, [courseId]);

  

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

  
    try {
      const formData = new FormData();
     
      if (courseId) formData.append("courseId", courseId);
      if (title) formData.append("title", title);
      if (subtitle) formData.append("subtitle", subtitle);
      if (duration) formData.append("duration", duration);
      if (fee) formData.append("fee", fee);
      if (description) formData.append("description", description);
      if (bannerImage) formData.append("banner", bannerImage);
      if(introVideo) formData.append("introvideo", introVideo);


      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
        const response = await mentorAxios.patch(
          mentorEndpoints.editCoursePost,
          formData, {headers: {
            'Content-Type': 'application/json'
          }}
        );
  
        if (response.status === 201) {
          showSuccessToast("Course Updated");
          setTimeout(() => {
            navigate(mentorEndpoints.courses);
          }, 3000);
        } else {
          showErrorToast(response?.data?.message);
        }
      }
    catch (error) {
      showErrorToast((error as Error).message);
    }
  };
  

  return (
    <div className="bg-[#2233]  ">
      {verificationStatus === "Pending" || verificationStatus === "Reject" ? (
        <p className="text-center py-4 text-gray-500 bg-red-200 shadow-md rounded  overflow-x-auto">
          Account is not verified by the admin
        </p>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto ">
            <h1 className="text-xl mb-5">Edit Course</h1>
            <ToastContainer/>
            <div>
              <label htmlFor="title">Course Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setTitle(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="subtitle">Course Subtitle </label>
              <input
                type="text"
                id="email"
                name="subtitle"
                value={subtitle}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setSubtitle(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="duration">Course Duration </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={duration}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setDuration(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="fee">Course Fee</label>
              <input
                type="number"
                id="fee"
                value={fee}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setFee(event.target.value)}
                name="fee"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="createdby">Course Created By</label>
              <input
                type="text"
                id="createdby"
                name="createdby"
                value={createdby}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setCreatedBy(event.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description">Course Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => setDescription(event.target.value)}
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="image-selection">
              <label htmlFor="banner" className="custom-file-upload">
                {bannerImage || previewBanner
                  ? "\u00a0  \u00a0  Choose another banner image"
                  : " \u00a0  \u00a0 Select a banner image"}
              </label>
              <input
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

            <div className="image-selection">
              <label htmlFor="introvideo" className="custom-file-upload">
                {introVideo || previewVideo
                  ? "\u00a0  \u00a0  Choose another introduction video"
                  : " \u00a0  \u00a0 Select an introduction video"}
              </label>
              <input
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
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-4 mb-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
