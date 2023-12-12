import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
const authURL = import.meta.env.VITE_APIURL;
interface ErrorResponse {
    error: string;
}
export const userAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
        
    },
});
userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('usertoken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
userAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;

            if (axiosError.response?.data.error === 'jwt expired') {
                toast.error('Session Expired. Please Login Again.');
            } else if (axiosError.response?.data) {
                toast.error(axiosError.response.data.error);
            } else {
                toast.error('Network Error occurred.');
            }
        }
        return Promise.reject(error);
    }
);


