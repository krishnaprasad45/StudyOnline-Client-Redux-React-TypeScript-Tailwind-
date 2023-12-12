import { toast, ToastPosition } from 'react-toastify';
import "../../index.css"
import "react-toastify/dist/ReactToastify.css";


export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-center' as ToastPosition,
    autoClose: 1000,
    hideProgressBar: true,
    className: 'custom-toast',
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center' as ToastPosition,
    autoClose: 3000,
    hideProgressBar: true,
    className: 'custom-error-toast',
  });
};
