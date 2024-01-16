import * as Yup from "yup";


export const chapterAddSchema = Yup.object().shape({
    title: Yup.string().required("Please enter chapter name"),
    duration: Yup.string().required("Please enter  chapter duration"),
    description: Yup.string().required("Please enter chapter description"),
    // chaptervideo: Yup.mixed().required("Please select a video file"),
  });