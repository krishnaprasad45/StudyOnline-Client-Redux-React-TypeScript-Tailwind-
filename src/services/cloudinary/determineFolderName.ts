const determineFolderName = (fileType: string) => {
  if (fileType.startsWith("image")) {
    return "Course Banner";
  } else if (fileType.startsWith("video")) {
    return "Course Intro Video";
  } else {
    return "Documents";
  }
};
export default determineFolderName;
