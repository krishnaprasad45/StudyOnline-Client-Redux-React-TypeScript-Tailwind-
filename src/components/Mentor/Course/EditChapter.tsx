import { useEffect, useState } from "react";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../services/popups/popups";
import { useLocation, useNavigate } from "react-router-dom";
import { mentorAxios } from "../../../Constraints/axiosInterceptors/mentorAxiosInterceptors";
import mentorEndpoints from "../../../Constraints/endpoints/mentorEndpoints";
import uploadVideo from "../../../services/cloudinary/customeImageUpload";
import { ChapterInterface } from "../../../Interfaces/chapterInterface";
import { ToastContainer } from "react-toastify";

const EditChapter: React.FC = () => {
  const [chapterVideo, setchapterVideo] = useState<File>();
  const [videoLoading, setvideoLoading] = useState<boolean>(false);
  const [previewVideo, setPreviewVideo] = useState<string>();
  const { state } = useLocation();
  const chapterId = state.chapterId;
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<ChapterInterface>();
  const [title, setTitle] = useState<string | undefined>(chapter?.title);
  const [description, setDescription] = useState<string | undefined>(
    chapter?.description
  );
  const [duration, setDuration] = useState<string | undefined>(
    chapter?.duration
  );
  const [chaptervideo, setChaptervideo] = useState<string | undefined>(
    chapter?.chaptervideo
  );

  useEffect(() => {
    mentorAxios
      .get(`${mentorEndpoints.getChapter}?chapterId=${chapterId}`)
      .then((response) => {
        setChapter(response.data as ChapterInterface);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setChaptervideo(response.data.chaptervideo);
      })
      .catch((error) => alert(error));
  }, [chapterId]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (chapterId) formData.append("chapterId", chapterId);
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (duration) formData.append("duration", duration);
      if (chaptervideo) formData.append("chaptervideo", chaptervideo);
      const response = await mentorAxios.patch(
        mentorEndpoints.editChapter,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        showSuccessToast("Chapter updated");
        setTimeout(() => {
          navigate(mentorEndpoints.courses);
        }, 2500);
      } else {
        showErrorToast(response?.data?.message);
      }
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <div className="bg-[#2233]  h-screen  ">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto ">
        <h1 className="text-xl mb-5">Add Chapter</h1>
        <ToastContainer />
        <div>
          <label htmlFor="title">Chapter Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setTitle(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
               w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description">Chapter Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setDescription(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="duration">Chapter Duration </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setDuration(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="image-selection">
          <label htmlFor="chaptervideo" className="custom-file-upload">
            {chapterVideo || previewVideo
              ? "\u00a0  \u00a0  Choose another video"
              : " \u00a0  \u00a0 Select a video"}
          </label>
          <input
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
  );
};

export default EditChapter;
