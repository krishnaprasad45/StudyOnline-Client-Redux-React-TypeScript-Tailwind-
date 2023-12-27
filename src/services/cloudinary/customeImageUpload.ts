import axios from "axios";

const  uploadImage = async (uploadFile: File,folderName:string) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const cloudPreset = import.meta.env.VITE_CLOUD_PRESET;
      
      
  
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", cloudPreset);
      formData.append("folder", folderName);
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      return response.data.secure_url as string;
    } catch (error) {
      console.error(error);
    }
  }
export default  uploadImage