import * as Yup from "yup";


export const courseAddSchema = Yup.object().shape({
    title: Yup.string().required("Please enter course title"),
    subtitle: Yup.string().required("Please enter  course title"),
    duration: Yup.string().required("Please enter your course duration"),
    fee: Yup.number().required("Please enter your course fee").min(0, 'Fee cannot be a negative number'),
    createdby: Yup.string().required("Please your name as created "),
    description: Yup.string().required("Please your course description"),
    // banner: Yup.mixed().required("Please select an image file"), 
    // introvideo: Yup.mixed().required("Please select a video file"),
  });