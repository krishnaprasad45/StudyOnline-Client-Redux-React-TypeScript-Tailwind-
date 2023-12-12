import axios from "axios";

const authURL = import.meta.env.VITE_APIURL;

export const mentorAxios = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

mentorAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('mentorToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


