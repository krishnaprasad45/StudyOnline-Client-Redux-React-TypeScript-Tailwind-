import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { useLocation, useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import { chapterAddSchema } from "../../../utils/chapter";
import uploadVideo from "../../../services/cloudinary/customeImageUpload";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";

const AddCourse: React.FC = () => {
  const [chapterVideo, setchapterVideo] = useState<File>();
  const [videoLoading, setvideoLoading] = useState<boolean>(false);

  const [previewVideo, setPreviewVideo] = useState<string>();
  const { state } = useLocation();
  const chapterId = state.chapterId;
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterInterface>();
  console.log("chapter", chapter);
  const [inputValue, setInputValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);  
    console.log(inputValue)
  };

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getChapter}?chapterId=${chapterId}`)
      .then((response) => {
        setChapter(response.data);
      })
      .catch((error) => alert(error));
  }, [chapterId]);

  const initialValues = {
    title: "Hello",
    description: "",
    duration: "",
    chaptervideo: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (chapterVideo) {
        const chaptervideo = previewVideo;

        const Data = { ...values, chaptervideo, chapterId };
        const response = await mentorAxios.post(
          mentorEndpoints.addChapterPost,
          Data
        );
        if (response.status === 201) {
          showSuccessToast("Chapter Created");
          setTimeout(() => {
            navigate(mentorEndpoints.courses);
          }, 2500);
        } else {
          showErrorToast(response?.data?.message);
        }
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <div className="bg-[#2233]  h-screen  ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={chapterAddSchema}
      >
        <Form className="max-w-sm mx-auto ">
          <h1 className="text-xl mb-5">Add Chapter</h1>
          <div>
            <label htmlFor="title">Chapter Name:</label>
            <Field
              type="text"
              id="title"
              name="title"
            //   value = {chapter?.title}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
               w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="description">Chapter Description</label>
            <Field
              type="text"
              id="description"
              name="description"
              value = {chapter?.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="duration">Chapter Duration </label>
            <Field
              type="text"
              id="duration"
              name="duration"
              value={chapter?.duration}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorMessage name="duration" component="div" className="error" />
          </div>

          <div className="image-selection">
            <label htmlFor="chaptervideo" className="custom-file-upload">
              {chapterVideo || previewVideo
                ? "\u00a0  \u00a0  Choose another video"
                : " \u00a0  \u00a0 Select a video"}
            </label>
            <Field
              type="file"
              name="chaptervideo"
              id="chaptervideo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const imageFileList = e.target.files;
                if (imageFileList && imageFileList.length > 0) {
                  const video = imageFileList[0];
                  setchapterVideo(video);
                  setvideoLoading(true);
                  uploadVideo(video, "Chapter Video").then((url) => {
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
              name="chaptervideo"
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
  );
};

export default AddCourse;
